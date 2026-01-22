import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { homeRotas } from "../routes/routes";

const Aside = ({ isOpen, onClose }) => {
    const [active, setActive] = useState(0);
    const location = useLocation();
    
    const rotas = homeRotas.map(rota => rota.path.replace("/", ""))
    const activeClass = "bg-[#F2F5FF] relative rounded-l-4xl px-4 py-2 text-[#1447E6]"
    const activeClassHover = "hover:bg-[#F2F5FF] hover:relative hover:rounded-l-4xl hover:px-4 hover:text-[#1447E6]"

    useEffect(() => {
        const index = rotas.indexOf(location.pathname.replace("/", "")) + 1
        setActive(index);
    }, [location]);

    const items = [];

    for (let i = 0; i < rotas.length; i++) {
        const formatWord = rotas[i][0].toUpperCase() + rotas[i].slice(1);
        items.push(
            <li id={`item-${i + 1}`} key={i} onClick={onClose}>
                <Link to={`/${rotas[i]}`}>
                    <div
                        className={`${
                            active === i + 1
                                ? activeClass
                                : "py-2 px-4 min-w-fit"
                        } ${activeClassHover}`}
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
          fixed top-0 left-0 z-50
          pt-10 text-2xl
          md:max-w-[300px] h-full
          backdrop-blur-sm
          transition-transform duration-300
          shadow-2xl rounded-r-2xl
          min-w-[60%]
          md:min-w-[15%]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
            >
                <div className="absolute -z-10 m-0 inset-0 bg-[#ffffff63] rounded-r-2xl"></div>
                <nav className="p-4 pr-0 space-y-2 min-w-fit">
                    <ul className="flex flex-col ml-3 gap-1 min-w-fit">{items}</ul>
                </nav>
            </aside>
        </>
    );
};

export default Aside;
