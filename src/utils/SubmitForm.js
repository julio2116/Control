import DeleteItem from "../classes/deleteItem";
import CreateItem from "../classes/createItem";
import Queue from "../classes/queue";
import fetchCall from "./fetchCall"

const submitForm = async (e, type, payload) => {
    e.preventDefault();
    console.log(payload);
    if (!payload) {
        const data = new FormData(e.target);
        const tempData = Object.fromEntries(data);
        for (const [key, value] of Object.entries(tempData)) {
            if (!value) throw new Error("PREENCHA TODOS OS ITENS");
        }
        payload = [];
        payload.push(tempData);
    }

    const groupsQtd = Math.ceil(payload.length / 5);
    let lastIndex = 0;
    let result = [];
    console.log(payload);

    for (let i = 0; i < groupsQtd; i++) {
        console.log(groupsQtd);
        await Queue.enQueue(async () => {
            const formatedData = formatData(
                payload.slice(lastIndex, lastIndex + 5),
                type
            );

            const dados = await fetchCall({ type, formatedData }, "apiCall");

            result.push(dados);
        });
        lastIndex += 5;
    }

    return result;
};

function formatData(payload, type) {
    switch (type) {
        case "delete":
            const newDeleteItem = payload.map((item) => {
                return new DeleteItem(
                    item.id,
                    item.nome,
                    item.qtd,
                );
            });
            const listaDelete = newDeleteItem.map((item) =>
                DeleteItem.KeysAndValues(item)
            );
            return "lista=" + encodeURIComponent(JSON.stringify(listaDelete));

        case "create":
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
                "Tipo desconhecido, use: create, update, delete, readOne, saldo, readAll"
            );
    }
}

export default submitForm;
