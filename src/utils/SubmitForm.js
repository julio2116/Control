import DeleteItem from "../classes/deleteItem";
import CreateItem from "../classes/createItem";
import Queue from "../classes/queue";
import fetchCall from "./fetchCall"

const submitForm = async (e, route, payload) => {
    e.preventDefault();

    if (!payload) {
        const data = new FormData(e.target);
        const tempData = Object.fromEntries(data);
        for (const [key, value] of Object.entries(tempData)) {
            if (!value) throw new Error("PREENCHA TODOS OS ITENS");
        }
        payload = [];
        payload.push(tempData);
    }

    if (!Array.isArray(payload)) {
        const tempData = payload;
        payload = []
        payload.push(tempData)
    }

    const groupsQtd = Math.ceil(payload.length / 5);
    let lastIndex = 0;
    let result = [];

    for (let i = 0; i < groupsQtd; i++) {
        await Queue.enQueue(async () => {
            const formatedData = formatData(
                payload.slice(lastIndex, lastIndex + 5),
                route
            );
            const dados = await fetchCall({ route, formatedData });

            result.push(dados);
        });
        lastIndex += 5;
    }

    return result;
};

function formatData(payload, route) {
    switch (route) {
        case "apiDelete":
            const newDeleteItem = payload.map((item) => {
                return new DeleteItem(
                    item.nome,
                    item.id,
                    item.qtd,
                );
            });
            const listaDelete = newDeleteItem.map((item) =>
                DeleteItem.KeysAndValues(item)
            );

            return "lista=" + encodeURIComponent(JSON.stringify(listaDelete));

        case "apiCreate":
            let newCreateItem = [];

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

            const lista = newCreateItem.map((item) =>
                CreateItem.KeysAndValues(item)
            );

            return "lista=" + encodeURIComponent(JSON.stringify(lista));

        default:
            throw new Error(
                "Tipo desconhecido, use: POST, UPDATE, DELETE, GET"
            );
    }
}

export default submitForm;
