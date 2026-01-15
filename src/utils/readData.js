import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";
import { parseXMLContent } from "./parseXMLContent";
import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

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
            `${files.length} ${
                files.length > 1
                    ? "arquivos XML selecionados"
                    : "arquivo XML selecionado"
            }`
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
        `${files.length} ${
            files.length > 1 ? "PDFs selecionados" : "PDF selecionado"
        }`
    );

    let finalResult = [];

    for (let file of files) {
        const buffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(new Uint8Array(buffer)).promise;

        let finalText = "";

        for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex++) {
            const page = await pdf.getPage(pageIndex);
            const content = await page.getTextContent();

            let pageText = content.items.map((i) => i.str).join(" ");

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
        `${files.length} PDF${files.length > 1 ? "s" : ""} selecionado${
            files.length > 1 ? "s" : ""
        }`
    );

    return finalResult;
}

/* =========================
   PDF interpreter
========================= */

const nfSchema = {
    type: "object",
    properties: {
        chave: { type: "string" },
        cnpjEmitente: { type: "string" },
        dataEmissao: {
            type: "string",
            description: "Formato DD/MM/YYYY",
        },
        nomeEmitente: { type: "string" },
        numeroNota: { type: "string" },
        produtos: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    descricao: { type: "string" },
                    qtd: { type: "number" },
                    valor: { type: "number" },
                },
            },
        },
    },
    required: [
        "chave",
        "cnpjEmitente",
        "dataEmissao",
        "nomeEmitente",
        "numeroNota",
        "produtos",
    ],
};

const nfBatchSchema = {
    type: "object",
    properties: {
        notas: {
            type: "array",
            items: nfSchema,
        },
        total: { type: "number" },
    },
    required: ["notas", "total"],
};

export async function pdfInterpreterAI(e, payload, onStatus) {
    e.preventDefault();

    if (!Array.isArray(payload) || payload.length === 0) {
        onStatus?.("Nenhum dado para processamento");
        return null;
    }

    if (!payload) {
        onStatus?.("Nenhum dado para processamento");
        return null;
    }

    onStatus?.("Processando dados com IA...");

    const text = `
    Você receberá VÁRIAS notas fiscais em texto bruto.

    TAREFA:
    - Extraia os dados de CADA nota fiscal
    - Mantenha a MESMA ORDEM recebida
    - Se um campo não existir, retorne "" ou 0
    - Não invente valores
    - A chave total representa o número de notas recebidas
    - Para nota de comércio, busque o valor unitario para a chave valor

    IMPORTANTE:
    - É PROIBIDO criar produtos, valores, quantidades ou descrições que não apareçam literalmente no texto

    VALOR DO PRODUTO:
    - Para notas de comércio, utilize APENAS o valor unitário informado
    - Se não houver valor unitário explícito, retorne 0

    QUANTIDADE DO PRODUTO:
    - Caso não identifique uma quantidade para o produto mas, tenha identificado sua descrição pode definir o campo como 1

    FORMATO DE RESPOSTA (JSON ESTRITO):
    {
    "total": number,
    "notas": array
    }

    NOTAS:
    ${payload.map((item) => JSON.stringify(item)).join("\n\n---\n\n")}
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                role: "user",
                parts: [{ text }],
            },
        ],
        config: {
            responseMimeType: "application/json",
            responseSchema: nfBatchSchema,
        },
    });

    const data = response.candidates[0].content.parts[0].text;
    
    const result = JSON.parse(data);

    if (result.total !== result.notas.length) {
        console.warn("Total divergente do número de notas");
    }

    return result.notas;
}
