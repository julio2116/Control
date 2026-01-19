import { GoogleGenAI } from "@google/genai";

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

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }
    
    try {
        const {text} = req.body
        const API_KEY = process.env.GEMINI_API_KEY;
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        
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
        const parsed = JSON.parse(data)

        res.status(200).json(parsed);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
