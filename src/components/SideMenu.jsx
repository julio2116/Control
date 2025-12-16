import { useState } from "react";
import Aside from "./Aside.jsx";

const SideMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [show, setShow] = useState("block");

    function getMenu(value){
        setShowMenu(value)
    }
    return (
        <>
            <div className="md:w-[25%] md:min-w-[235px] md:block">
                <div className="hidden md:block">
                    <Aside />
                </div>
                <div className="md:hidden fixed w-[65%] z-99">
                    <div
                        className="w-10 h-10 bg-black fixed top-5 left-5"
                        style={{ display: `${show}` }}
                        onClick={() => {
                            getMenu(true);
                            setShow("none");
                        }}
                    ></div>
                    {showMenu && (
                        <Aside
                            onGetMenu={getMenu}
                            onSetShow={setShow}
                            showMenu={showMenu}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default SideMenu;
