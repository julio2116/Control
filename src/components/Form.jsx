import { useState, useEffect } from "react";
import submitForm from "../utils/SubmitForm";
import retorno from "../utils/return";
import Loading from "./Loading";

const Form = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [allNames, setAllNames] = useState([]);        // valores vindos do fetch
    const [filtered, setFiltered] = useState([]);        // valores filtrados conforme digita
    const [nome, setNome] = useState("");                // valor atual do input

    //------------------------------------
    // 1) BUSCAR TODOS OS NOMES NA MONTAGEM
    //------------------------------------
    useEffect(() => {
        async function loadNames() {
            const url =
                "https://script.google.com/macros/s/AKfycbz-hB5-t8dMY5HOUER6JfaqeNQB0PSPSP4xuV6N6hbn7vaIqw-_xO8xkcraRkZp_I-2/exec?route=readAll";

            try {
                const res = await fetch(url);
                const data = await res.json();
                console.log(data)
                // Supondo que data venha como array de objetos tipo { nome: "...", ... }
                setAllNames(data.items);
            } catch (err) {
                console.error("Erro ao carregar nomes:", err);
            }
        }

        loadNames();
    }, []);

    //------------------------------------
    // 2) FILTRAR CONFORME O USER DIGITA
    //------------------------------------
    function handleNomeChange(e) {
        const value = e.target.value;
        setNome(value);

        if (value.trim() === "") {
            setFiltered([]);
            return;
        }

        const filtrados = allNames.filter((item) =>
            item.nome_produto.toLowerCase().includes(value.toLowerCase())
        );

        console.log(filtrados)
        setFiltered(filtrados);
    }

    //------------------------------------
    // 3) SELECIONAR SUGESTÃO
    //------------------------------------
    function selectName(nomeEscolhido) {
        setNome(nomeEscolhido);
        setFiltered([]); // fecha sugestões
    }

    //------------------------------------
    // 4) ENVIO NORMAL DO FORMULÁRIO
    //------------------------------------
    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const create = await submitForm(e);
        retorno(create);

        setIsLoading(false);
    }

    return (
        <div className="w-full max-w-md mx-auto mt-10 relative">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-2xl p-6 space-y-5 border border-gray-100"
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    Baixa de itens
                </h2>

                {/* Nome */}
                <div className="flex flex-col relative">
                    <label htmlFor="nome" className="text-gray-600 font-medium mb-1">
                        Nome
                    </label>

                    <input
                        id="nome"
                        name="nome"
                        type="text"
                        value={nome}
                        onChange={handleNomeChange}
                        className="px-3 py-2 rounded-xl border border-gray-300 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Seu nome"
                        autoComplete="off"
                    />

                    {/* LISTA DE SUGESTÕES */}
                    {filtered.length > 0 && (
                        <ul className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-52 overflow-y-auto z-50">
                            {filtered.map((item) => (
                                <li
                                    key={item.id || item.nome_produto}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => selectName(item.nome_produto)}
                                >
                                    {item.nome_produto}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-600 font-medium mb-1">
                        Quantidade da saída
                    </label>
                    <input
                        id="qtd"
                        name="qtd"
                        type="text"
                        className="px-3 py-2 rounded-xl border border-gray-300 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1"
                    />
                </div>

                {/* Botão */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold
                    hover:bg-blue-700 transition-all active:scale-[0.97]"
                >
                    {isLoading ? "Enviando..." : "Enviar"}
                </button>
            </form>

            {isLoading && (
                <div className="flex justify-center mt-6">
                    <Loading message="iel" />
                </div>
            )}
        </div>
    );
};

export default Form;
