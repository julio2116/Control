export function parseXMLContent(xmlText) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "application/xml");

  // Trata NF com ou sem nfeProc
  const infNFe =
    xml.querySelector("nfeProc > NFe > infNFe") ||
    xml.querySelector("infNFe");

  if (!infNFe) {
    throw new Error("XML inválido ou estrutura não reconhecida");
  }

  const ide = infNFe.querySelector("ide");
  const emit = infNFe.querySelector("emit");
  const dets = infNFe.querySelectorAll("det");
  const chave = infNFe.getAttribute("Id").split("NFe")[1];
  const numeroNota = ide?.querySelector("nNF")?.textContent || "";
  
  const notaDate = ide?.querySelector("dhEmi")?.textContent || "";
  const date = new Date(notaDate);
  const dataEmissao = `${date.getDate() + 1 > 9 ? date.getDate() + 1 : "0" + (date.getDate() + 1)}/${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)}/${date.getFullYear()}`
  
  const nomeEmitente = emit?.querySelector("xNome")?.textContent || "";
  const cnpjEmitente = emit?.querySelector("CNPJ")?.textContent || "";

  const produtos = Array.from(dets).map((det) => {
    const prod = det.querySelector("prod");
    return {
      descricao: prod?.querySelector("xProd")?.textContent || "",
      qtd: Number(prod?.querySelector("qCom")?.textContent || 0),
      valor: Number(prod?.querySelector("vProd")?.textContent || 0),
    };
  });

  

  return {
    chave,
    numeroNota,
    dataEmissao,
    nomeEmitente,
    cnpjEmitente,
    produtos,
  };
}
