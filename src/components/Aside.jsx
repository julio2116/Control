import { useState } from "react";

const Aside = ({ onGetMenu = null, onSetShow = null, showMenu }) => {
    const [movement, setMovement] = useState("0")

    function activateMenu(value) {
        setMovement( value ? "0" : "-60%")
        onGetMenu(value);
    }
    const mobile = onSetShow!==null && onGetMenu!==null;
console.log(mobile)
    const aside = (
        <aside
            style={{ transform: `translateX(${movement})` }}
            className={`bg-red-500 h-screen ${
                mobile ? "fixed z-20 top-0 w-[60%]" : "min-w-full"
            } transition-all duration-300`}
        >
            teste
        </aside>
    );

    if (!mobile) {
        return <>{aside}</>;
    }
    return (
        <>
            {aside}
            <div
                className="w-full h-screen fixed bg-[#00000080] top-0 left-0 z-10"
                onClick={() => {
                    activateMenu(false);
                    onSetShow("block");
                }}
            >super teste</div>
        </>
    );
};

export default Aside;
