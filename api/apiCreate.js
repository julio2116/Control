export default async function apiCreate(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }
    const URL = process.env.URL;

    try {
        const { formatedData } = req.body;
        const url = URL + "?route=create&" + formatedData;
        const resposta = await fetch(url);
        const dados = await resposta.json();

        res.status(201).json({ dados });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
