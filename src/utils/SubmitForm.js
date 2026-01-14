import DeleteItem from "../classes/deleteItem";
import CreateItem from "../classes/createItem";

const submitForm = async (e, type, payload) => {
    const URL = import.meta.env.VITE_URL;
    e.preventDefault();
    
    if(!payload){
        const data = new FormData(e.target);
        payload = Object.fromEntries(data);
        for(const [key, value] of Object.entries(payload)){
            if(!value) throw new Error('PREENCHA TODOS OS ITENS')
        }
    }

    const formatedData = formatData(payload, type);

    const url = URL + "?route=" + type + "&" + formatedData;
    console.log(url)
    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados;
};

function formatData(payload, type){
    const {fileName, chave, numeroNota, dataEmissao, nomeEmitente, cnpjEmitente, produtos} = payload;

    switch(type){
        case "delete":
            const newDeleteItem = new DeleteItem(fileName, chave, numeroNota, dataEmissao, nomeEmitente, cnpjEmitente, produtos);
            return DeleteItem.KeysAndValues(newDeleteItem);
            
        case "create":
            // const newChave = chave.replaceAll(" ", "");
            const newCreateItem = new CreateItem(fileName, newChave, numeroNota, dataEmissao, nomeEmitente, cnpjEmitente, produtos);
            return CreateItem.KeysAndValues(newCreateItem);
            
        default:
            throw new Error("Tipo desconhecido, use: create, update, delete, readOne, saldo, readAll")
    }
}

export default submitForm;
