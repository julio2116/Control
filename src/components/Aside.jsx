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
                <nav className="p-4 space-y-2">
                    <ul>
                        <li>
                            <Link to={"/"}>Excluir itens</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Aside;
