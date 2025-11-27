import { useState } from "react";
import submitForm from "../utils/SubmitForm";
import retorno from "../utils/return";
import Loading from "./Loading";

const Form = () => {
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e) {
        setIsLoading(true)
        const create = await submitForm(e)
        retorno(create)
        setIsLoading(false)
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input id="nome" name="nome" type="text" />
                <input id="email" name="email" type="text" />
                <input id="mensagem" name="mensagem" type="text" />
                <button>enviar</button>
            </form>
            {isLoading ? <Loading message='iel' /> : ""}
        </>
    );
};

export default Form;
