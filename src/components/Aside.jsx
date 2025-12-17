import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

const Aside = ({ isOpen, onClose }) => {
    const [active, setActive] = useState(0);
    const location = useLocation();

    const rotas = ["baixar", "criar", "alterar"];
    const activeClass = "bg-[#f2f5ff] relative rounded-l-4xl px-4 py-2"

    console.log(location.pathname.replace("/", ""));

    useEffect(() => {
        const index = rotas.indexOf(location.pathname.replace("/", "")) + 1
        setActive(index);
    }, [location]);

    const items = [];

    for (let i = 0; i < rotas.length; i++) {
        const formatWord = rotas[i][0].toUpperCase() + rotas[i].slice(1);
        items.push(
            <li id={`item-${i + 1}`} key={i}>
                <Link to={`/${rotas[i]}`}>
                    <div
                        className={`${
                            active === i + 1
                                ? activeClass
                                : "py-2"
                        } hover:${activeClass}`}
                    >
                        {formatWord} itens
                    </div>
                </Link>
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
                <nav className="p-4 pr-0 space-y-2">
                    <ul className="flex flex-col ml-3 gap-1">{items}</ul>
                </nav>
            </aside>
        </>
    );
};

export default Aside;
