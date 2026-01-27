import bcrypt from "bcrypt";

export default async function apiCreateUser(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const URL = process.env.URL;

    try {
        const { email, senha } = req.body;
        
        bcrypt.hash(senha, 10, async (err, hash) => {
            if(err) res.status(500).json({ error: err.message });
            console.log(`${URL}?route=createUser&email=${email}&senha=${hash}`)
            console.log(hash)
            // const url = URL + "?route=createUser&" + formatedData.email + hash;
            // const resposta = await fetch(url);
            // const dados = await resposta.json();
            res.status(201).json({ funfou: "funfado" });
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
