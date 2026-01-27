import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default async function apiLogin(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const URL = process.env.URL;

    try {
        const { email, senha } = req.body;
        const url = `${URL}?route=login&email=${email}`;
        const resposta = await fetch(url);
        const dados = await resposta.json();
        console.log(dados);
        console.log(dados.senha);

        if (dados.error){
            res.status(200).json(dados.error);
            return;
        }

        const match = await bcrypt.compare(senha, dados.senha);
        console.log(match)

        if (!match) {
            res.status(500).json({ error: "Senha inválida" })
            return;
        }

        const token = jwt.sign({dados: dados.id}, "teste", {
            expiresIn: "30d"
        });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
