import { NewItem } from "../classes/newItem";

const submitForm = async (e) => {
    const URL = import.meta.env.VITE_URL;
    e.preventDefault();

    const data = new FormData(e.target);
    const payload = Object.fromEntries(data);
    const newItem = new NewItem(...Object.values(payload))
    const formatData = NewItem.KeysAndValues(newItem)

    const url = `${URL + formatData}`;
    console.log(url)
    const resposta = await fetch(url);
    const dados = await resposta.json();
    
    return dados
};

export default submitForm;
