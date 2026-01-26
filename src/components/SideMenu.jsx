import { useState } from "react";
import Aside from "./Aside.jsx";

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="fixed md:static z-[49] md:min-w-[15%] max-w-[60%] top-5 left-5">
                <div
                    className={`${
                        isOpen ? "hidden" : "block"
                    } md:hidden p-3 rounded-full backdrop-blur-2xl min-w-[15%] max-w-[50px] top-5 left-5 shadow-2xl`}
                >
                    <img
                        className="w-full"
                        onClick={() => setIsOpen(true)}
                        src="/menu.png"
                    />
                </div>

                <Aside isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </div>
        </>
    );
};

export default SideMenu;
