import { useState, useEffect } from "react";
import submitForm from "../utils/SubmitForm";
import retorno from "../utils/return";
import Loading from "./Loading";

const Form = () => {
    const empty = {
        produto: "",
        id: "",
        saldoFinal: "",
        saida: ""
    }
    const [isLoading, setIsLoading] = useState(false);
    const [allNames, setAllNames] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [produto, setProduto] = useState(empty);

    const URL = import.meta.env.VITE_URL;

    useEffect(() => {
        async function loadNames() {
            const url = URL;
            try {
                const res = await fetch(url);
                const data = await res.json();
                setAllNames(data.items);
            } catch (err) {
                console.error("Erro ao carregar nomes:", err);
            }
        }

        loadNames();
    }, []);

    function handleNomeChange(e) {
        const value = e.target.value;

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

    function handleQtd(e){
        const value = e.target.value;

        setProduto((prev) => ({
            ...prev,
            saida: value,
        }));
    }

    function selectName(item) {
        setProduto({
            produto: item.produto,
            id: item.id,
            saldoFinal: item.saldoFinal,
        });

        setFiltered([]);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const create = await submitForm(e);
            retorno(create);
            setIsLoading(false);
            setProduto(empty)
        } catch (e) {
            setIsLoading(false);
            console.log(e)
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
                            value={produto.saida}
                            onChange={handleQtd}
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
