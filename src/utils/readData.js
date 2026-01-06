import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";
import { parseXMLContent } from "./parseXMLCOntent";

/* =========================
   PDF WORKER
========================= */
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

/* =========================
   XML
========================= */
export function processXMLFiles(files, onStatus) {
  return new Promise((resolve, reject) => {
    if (!files.length) {
      onStatus?.("Selecione ao menos 1 XML");
      return resolve([]);
    }

    onStatus?.(
      `${files.length} ${files.length > 1 ? "arquivos XML selecionados" : "arquivo XML selecionado"}`
    );

    const extractedData = [];
    let count = 0;

    for (let file of files) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const parsed = parseXMLContent(e.target.result);

          extractedData.push({
            fileName: file.name,
            ...parsed,
          });
        } catch (err) {
          console.error(`Erro ao processar ${file.name}`, err);
        }

        count++;
        if (count === files.length) {
          onStatus?.("XMLs processados com sucesso");
          resolve(extractedData);
        }
      };

      reader.onerror = reject;
      reader.readAsText(file);
    }
  });
}


/* =========================
   PDF + OCR
========================= */
export async function processPDFs(files, onStatus) {
  if (!files.length) {
    onStatus?.("Nenhum PDF selecionado");
    return [];
  }

  onStatus?.(
    `${files.length} ${files.length > 1 ? "PDFs selecionados" : "PDF selecionado"}`
  );

  let finalResult = [];

  for (let file of files) {
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(new Uint8Array(buffer)).promise;

    let finalText = "";

    for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex++) {
      const page = await pdf.getPage(pageIndex);
      const content = await page.getTextContent();

      let pageText = content.items.map(i => i.str).join(" ");

      if (!pageText || pageText.trim().length < 3) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const viewport = page.getViewport({ scale: 2 });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;

        const { data } = await Tesseract.recognize(canvas, "por");
        pageText = data.text;
      }

      finalText += pageText + "\n";
    }

    finalResult.push({
      fileName: file.name,
      content: finalText,
    });
  }

  onStatus?.(
    `${files.length} PDF${files.length > 1 ? "s" : ""} selecionado${files.length > 1 ? "s" : ""}`
  );

  return finalResult;
}

/* =========================
   ENVIO N8N
========================= */
export async function sendToN8N(payload, webhook, onStatus) {
  if (!payload?.length) {
    onStatus?.("Nenhum dado para envio");
    return false;
  }

  onStatus?.(
    `Enviando ${payload.length} arquivo${payload.length > 1 ? "s" : ""} para o N8N...`
  );

  try {
    const resp = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ NF: payload }),
    });

    onStatus?.(
      resp.ok
        ? "Processamento concluído"
        : "Erro na execução"
    );

    return resp.ok;
  } catch {
    onStatus?.("Falha na requisição");
    return false;
  }
}
