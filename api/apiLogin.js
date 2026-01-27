import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default async function apiLogin(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const URL = process.env.URL;

    try {
        const { email, senha } = req.body.formatedData;
        const url = URL + "?route=login&" + email;
        const resposta = await fetch(url);
        const dados = await resposta.json();

        const match = bcrypt.compare([senha], dados.senha);

        if (!match) res.status(500).json({ error: err.message });

        const token = jwt.sign(dados.id, "teste", {
            expiresIn: "30d",
        });

        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
