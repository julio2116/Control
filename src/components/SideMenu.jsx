import { useState } from "react";
import Aside from "./Aside.jsx";

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className={`${isOpen ? "hidden" : "block"} md:hidden p-3 rounded-full backdrop-blur-2xl w-[15%] max-w-[60px] top-5 left-5 fixed z-[49] shadow-2xl`}
            >
                <img
                    className="w-full"
                    onClick={() => setIsOpen(true)}
                    src="/menu.png"
                />
            </div>

            <Aside isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

export default SideMenu;
