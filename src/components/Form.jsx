import submitForm from "../utils/SubmitForm";

const Teste = () => {
    function handleSubmit(e) {
        const retorno = submitForm(e)
        
    }
    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input id="nome" name="nome" type="text" />
                <input id="email" name="email" type="text" />
                <input id="mensagem" name="mensagem" type="text" />
                <button>enviar</button>
            </form>
        </>
    );
};

export default Teste;
