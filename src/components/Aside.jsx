import { useState } from "react";
import { Link } from "react-router";

const Aside = ({ isOpen, onClose }) => {
    const [active, setActive] = useState();

    const rotas = ["deletar", "criar", "alterar"];

    const items = [];

    for (let i = 0; i < rotas.length; i++) {
        const formatWord = (rotas[i])[0].toUpperCase() + rotas[i].slice(1)
        items.push(
            <li
                id={`item-${i}`}
                key={i}
                onClick={(e) => setActive(e.target.id.split("-")[1])}
                className={`${active === i ? "bg-blue-500" : ""}`}
            >
                <Link to={`/${rotas[i]}`}>{formatWord} itens</Link>
            </li>
        );
    }

    return (
        <>
            <div
                onClick={onClose}
                className={`
          fixed inset-0 bg-black/10 z-40
          transition-opacity duration-300
          md:hidden
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
            />

            <aside
                className={`
          fixed md:static top-0 left-0 z-50
          pt-10 text-2xl
          w-[60%] md:w-[300px] h-screen
          backdrop-blur-xs
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
            >
                <div className="absolute -z-10 m-0 inset-0 bg-blue-200/40 backdrop-blur-md rounded-r-2xl"></div>
                <nav className="p-4 space-y-2">
                    <ul className="flex flex-col gap-5 ml-3">{items}</ul>
                </nav>
            </aside>
        </>
    );
};

export default Aside;
