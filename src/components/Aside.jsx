import { Link } from "react-router";

const Aside = ({ isOpen, onClose }) => {
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
                    <ul className="flex flex-col gap-5">
                        <li>
                            <Link to={"/excluir"}>Excluir itens</Link>
                        </li>
                        <li>
                            <Link to={"/excluir"}>Excluir itens</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Aside;
