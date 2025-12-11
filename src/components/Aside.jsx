import { useState } from "react"

const Aside = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [show, setShow] = useState("block")
    return(
        <>
            <div className="w-10 h-10 bg-black fixed top-5 left-5" style={{display: `${show}`}} onClick={()=>{setShowMenu(true); setShow("none")}}></div>
            {showMenu && (
                <div className="z-1 w-full h-screen fixed bg-[#00000018]" onClick={()=>{setShowMenu(false); setShow("block")}}>
                    <aside className="sm:min-w-[20%] z-2 absolute top-0 left-0">
                        teste
                    </aside>
                </div>
            )}
        </>
    )
}

export default Aside