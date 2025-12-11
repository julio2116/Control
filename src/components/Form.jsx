import { useState, useEffect } from "react";
import submitForm from "../utils/SubmitForm";
import retorno from "../utils/return";
import Loading from "./Loading";

const Form = () => {
    const empty = {
        produto: "",
        id: "",
        saldoFinal: "",
        saida: "",
    };
    const [isLoading, setIsLoading] = useState(false);
    const [allNames, setAllNames] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [produto, setProduto] = useState(empty);

    const URL = import.meta.env.VITE_URL;

    async function loadNames() {
        if (isLoading) return;
        const url = URL;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setAllNames(data.items);
        } catch (err) {
            console.error("Erro ao carregar nomes:", err);
        }
    }
    useEffect(() => {
        loadNames();
    }, [isLoading]);

    function handleNomeChange(e) {
        let value = e.target.value;

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

    function handleQtd(e) {
        const value = e.target.value;

        setProduto((prev) => ({
            ...prev,
            saida: value,
        }));
    }

    async function selectName(item) {
        setFiltered([]);
        setIsLoading(true);
        const fetchData = await fetch(URL + `?route=readOne&id=${item}`);
        const data = await fetchData.json();
        setProduto((prev) => ({ ...prev, ...data.item }));

        setIsLoading(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const items = e.target.querySelectorAll(".teste");
        const tagItems = {};
        items.forEach((item) => {
            Object.assign(tagItems, {
                [item.id]: item.value || item.innerText,
            });
        });

        if (tagItems.qtd > tagItems.available) {
            alert("Não existe valor em estoque para essa saída");
            return;
        }
        if (!tagItems.qtd || tagItems.qtd <= 0) {
            alert("Saída deve ser maior que 0");
            return;
        }

        setIsLoading(true);
        try {
            const create = await submitForm(e);
            setProduto(empty);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    }

    return (
        <>
            <main className="max-w-[500px] h-screen flex items-center m-auto w-full px-[1%]" role="main">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-xl rounded-2xl p-6 space-y-5 border border-gray-100 min-w-full"
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
                                        key={
                                            item.id ||
                                            `${item.produto}` + `${i}`
                                        }
                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => selectName(item.id)}
                                    >
                                        {item.produto}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="flex sm:gap-[4%] flex-col gap-5 sm:flex-row">
                        <div className="flex flex-col sm:w-1/2 min-w-[48%] w-full">
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
                        focus:outline-none focus:ring-2 focus:ring-blue-500 teste"
                                placeholder="1"
                                value={produto.saida}
                                onChange={handleQtd}
                            />
                        </div>
                        <div className="flex flex-col sm:w-1/2 min-w-[48%] w-full sm:max-h-[42px]">
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
                        focus:outline-none focus:ring-2 focus:ring-blue-500 sm:min-h-full min-w-full min-h-[42px] teste"
                                placeholder="1"
                            >
                                {produto.saldoFinal}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold
                    hover:bg-blue-700 transition-all active:scale-[0.97]"
                    >
                        Enviar
                    </button>
                </form>
            </main>
            {isLoading && <Loading />}
        </>
    );
};

export default Form;
