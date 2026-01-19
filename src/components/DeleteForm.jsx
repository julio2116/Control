import { useState, useEffect } from "react";
import submitForm from "../utils/SubmitForm";
import Loading from "./Loading";

const DeleteForm = () => {
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

    async function loadNames() {
        if (isLoading) return;
        try {
            const res = await fetch("api/apiGet");
            console.log(res)
            const data = await res.json();
            setAllNames(data.data.items);
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
        console.log(typeof allNames, allNames)
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
        const fetchID = await fetch(`api/apiGet?id=${item}`);
        const data = await fetchID.json();
        setProduto((prev) => ({ ...prev, ...data.item }));

        setIsLoading(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const items = e.target.querySelectorAll("input");
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
            await submitForm(e, "delete");
            setProduto(empty);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="relative z-[1] h-screen flex items-center m-auto justify-center w-full px-[5%]">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 backdrop-blur-lg text-black shadow-2xl rounded-2xl p-6 space-y-5 border border-gray-100 max-w-[500px] w-full"
                >
                    <div className="absolute -z-10 m-0 inset-0 bg-white/40 backdrop-blur-md rounded-2xl"></div>
                    <h2 className="text-2xl font-semibold text-center">
                        Baixa de itens
                    </h2>
                    <div className="flex flex-col relative gap-1">
                        <label
                            htmlFor="nome"
                            className="font-medium mb-1 relative focus-within:[&>span]:-top-5"
                        >
                            <input
                                id="nome"
                                name="nome"
                                type="text"
                                value={produto.produto}
                                onChange={handleNomeChange}
                                className="px-3 py-2 border-b-2 border-b-blue-500 w-full peer focus:outline-none"
                                placeholder=" "
                                autoComplete="off"
                            />
                            <span className="absolute top-2.5 left-3.5 transition-all duration-200 peer-not-placeholder-shown:-top-5 text-gray-600">
                                Produto
                            </span>
                        </label>

                        <input
                            id="id"
                            name="id"
                            type="text"
                            value={produto.id}
                            onChange={handleNomeChange}
                            className="px-3 py-2 border-b-2 border-b-blue-500 w-full peer focus:outline-none"
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
                                htmlFor="qtd"
                                className="font-medium mb-1 relative focus-within:[&>span]:-top-5"
                            >
                                <input
                                    id="qtd"
                                    name="qtd"
                                    type="text"
                                    className="px-3 py-2 border-b-2 border-b-blue-500 w-full peer focus:outline-none"
                                    placeholder=" "
                                    value={produto.saida}
                                    onChange={handleQtd}
                                />
                                <span className="absolute -z-1 top-2.5 left-3 transition-all duration-200 peer-not-placeholder-shown:-top-5 text-gray-600">
                                    Quantidade Saída
                                </span>
                            </label>
                        </div>
                        <div className="flex flex-col sm:w-1/2 min-w-[48%] w-full">
                            <label
                                htmlFor="available"
                                className="font-medium mb-1 relative focus-within:[&>span]:-top-5"
                            >
                                <input
                                    id="available"
                                    name="available"
                                    type="text"
                                    className="px-3 py-2 border-b-2 border-b-blue-500 w-full peer focus:outline-none"
                                    placeholder=" "
                                    value={produto.saldoFinal}
                                    readOnly
                                    contentEditable={false}
                                />
                                <span className="absolute -z-1 top-2.5 left-3 transition-all duration-200 peer-not-placeholder-shown:-top-5 text-gray-600">
                                    Disponivel
                                </span>
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold
                    hover:bg-blue-700 transition-all active:scale-[0.97] hover:cursor-pointer"
                    >
                        Enviar
                    </button>
                </form>
            </div>
            {isLoading && <Loading />}
        </>
    );
};

export default DeleteForm;
