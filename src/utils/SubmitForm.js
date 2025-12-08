import { NewItem } from "../classes/newItem";

const submitForm = async (e) => {
    const URL = import.meta.env.VITE_URL;
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = Object.fromEntries(data);

    for(const [key, value] of Object.entries(payload)){
        if(!value) throw new Error('PREENCHA TODOS OS ITENS')
    }

    const newItem = new NewItem(...Object.values(payload));
    const formatData = NewItem.KeysAndValues(newItem);

    const url = `${URL + "?route=create&" + formatData}`;
    const resposta = await fetch(url);
    const dados = await resposta.json();
    return dados;
};

export default submitForm;
