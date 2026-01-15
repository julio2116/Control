import DeleteItem from "../classes/deleteItem";
import CreateItem from "../classes/createItem";

const submitForm = async (e, type, payload) => {
    const URL = import.meta.env.VITE_URL;
    e.preventDefault();

    if (!payload) {
        const data = new FormData(e.target);
        payload = Object.fromEntries(data);
        for (const [key, value] of Object.entries(payload)) {
            if (!value) throw new Error("PREENCHA TODOS OS ITENS");
        }
    }

    const formatedData = formatData(payload, type);

    const url = URL + "?route=" + type + "&" + formatedData;
    console.log(url);
    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados;
};

function formatData(payload, type) {
    const {
        fileName,
        chave,
        numeroNota,
        dataEmissao,
        nomeEmitente,
        cnpjEmitente,
        produtos,
    } = payload;

    switch (type) {
        case "delete":
            const newDeleteItem = new DeleteItem(
                fileName,
                chave,
                numeroNota,
                dataEmissao,
                nomeEmitente,
                cnpjEmitente,
                produtos
            );
            return DeleteItem.KeysAndValues(newDeleteItem);

        case "create":
            let newCreateItem = [];
            if (Array.isArray(payload)) {
                newCreateItem = payload.map((item) => {
                    return new CreateItem(
                        item.fileName,
                        item.chave,
                        item.numeroNota,
                        item.dataEmissao,
                        item.nomeEmitente,
                        item.cnpjEmitente,
                        item.produtos
                    );
                });
            } else {
                newCreateItem.push(
                    new CreateItem(
                        payload.fileName,
                        payload.chave,
                        payload.numeroNota,
                        payload.dataEmissao,
                        payload.nomeEmitente,
                        payload.cnpjEmitente,
                        payload.produtos
                    )
                );
            }

            const lista = newCreateItem.map((item) =>
                CreateItem.KeysAndValues(item)
            );
            return "lista=" + encodeURIComponent(JSON.stringify(lista));

        default:
            throw new Error(
                "Tipo desconhecido, use: create, update, delete, readOne, saldo, readAll"
            );
    }
}

export default submitForm;
