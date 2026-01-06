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
    console.log(formatedData)

    const url = `${URL + "?route=" + type + "&" + formatedData}`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    return dados;
};

function formatData(payload, type){
    switch(type){
        case "delete":
            const newDeleteItem = new DeleteItem(...Object.values(payload));
            return DeleteItem.KeysAndValues(newDeleteItem);
            
        case "create":
            const newCreateItem = new CreateItem(...Object.values(payload[0]));
            return CreateItem.KeysAndValues(newCreateItem);
            
        default:
            throw new Error("Tipo desconhecido, use: create, update, delete, readOne, saldo, readAll")
    }
}

export default submitForm;
