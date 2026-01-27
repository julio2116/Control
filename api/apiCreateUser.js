import bcrypt from "bcrypt";

export default async function apiCreateUser(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const URL = process.env.URL;

    try {
        const { nome, email, senha } = req.body;
        
        bcrypt.hash(senha, 10, async (err, hash) => {
            if(err) res.status(500).json({ error: "Error hashing password" });

            const url = `${URL}?route=createUser&nome=${nome}&email=${email}&senha=${hash}`;
            const resposta = await fetch(url);
            const dados = await resposta.json();
            res.status(200).json({ dados });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
