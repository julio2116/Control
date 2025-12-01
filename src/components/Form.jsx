import { useState, useEffect } from "react";
import submitForm from "../utils/SubmitForm";
import retorno from "../utils/return";
import Loading from "./Loading";

const Form = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [allNames, setAllNames] = useState([]); // valores vindos do fetch
    const [filtered, setFiltered] = useState([]); // valores filtrados conforme digita
    const URL = import.meta.env.VITE_URL;
    // <<< ALTERAÇÃO 1: produto agora é OBJETO FIXO >>>
    const [produto, setProduto] = useState({
        produto: "",
        id: "",
        saldoFinal: 0,
    });

    //------------------------------------
    // 1) BUSCAR TODOS OS NOMES NA MONTAGEM
    //------------------------------------
    useEffect(() => {
        async function loadNames() {
            const url = URL;

            try {
                const res = await fetch(url);
                const data = await res.json();
                console.log(data);
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

        // <<< ALTERAÇÃO 2: atualizar só o campo Produto >>>
        setProduto((prev) => ({
            ...prev,
            produto: value,
        }));

        if (value.trim() === "") {
            setFiltered([]);
            return;
        }

        const filtrados = allNames.filter((item) =>
            item.produto.toLowerCase().includes(value.toLowerCase())
        );

        setFiltered(filtrados);
    }

    //------------------------------------
    // 3) SELECIONAR SUGESTÃO
    //------------------------------------
    function selectName(item) {
        console.log(item);
        // <<< ALTERAÇÃO 3: preencher Produto e Id corretamente >>>
        setProduto({
            produto: item.produto,
            id: item.id,
            saldoFinal: item.saldoFinal,
        });

        setFiltered([]); // fecha sugestões
    }

    //------------------------------------
    // 4) ENVIO NORMAL DO FORMULÁRIO
    //------------------------------------
    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const create = await submitForm(e);
            retorno(create);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            console.error(e)
        }
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
                    <label
                        htmlFor="nome"
                        className="text-gray-600 font-medium mb-1"
                    >
                        Nome
                    </label>

                    <input
                        id="nome"
                        name="nome"
                        type="text"
                        value={produto.produto}
                        onChange={handleNomeChange}
                        className="px-3 py-2 rounded-xl border border-gray-300 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Produto"
                        autoComplete="off"
                    />

                    <input
                        id="id"
                        name="id"
                        type="text"
                        value={produto.id}
                        onChange={handleNomeChange}
                        className="px-3 py-2 rounded-xl border border-gray-300 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ID"
                        readOnly
                        autoComplete="off"
                    />

                    {/* LISTA DE SUGESTÕES */}
                    {filtered.length > 0 && (
                        <ul className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-52 overflow-y-auto z-50">
                            {filtered.map((item, i) => (
                                <li
                                    key={item.id || `${item.produto}` + `${i}`}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => selectName(item)}
                                >
                                    {item.produto}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Quantidade */}
                <div className="flex gap-[4%]">
                    <div className="flex flex-col max-w-[48%]">
                        <label
                            htmlFor="email"
                            className="text-gray-600 font-medium mb-1"
                        >
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
                    <div className="flex flex-col min-w-[48%] max-h-[42px]">
                        <span
                            htmlFor="email"
                            className="text-gray-600 font-medium mb-1"
                        >
                            Disponível
                        </span>
                        <div
                            id="available"
                            name="available"
                            type="text"
                            className="px-3 py-2 rounded-xl border border-gray-300 text-[]
                        focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-full min-w-full"
                            placeholder="1"
                        >
                            {produto.saldoFinal}
                            {console.log(produto.saldoFinal)}
                        </div>
                    </div>
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
