import { Outlet } from "react-router"
import Aside from "../components/Aside.jsx"

const Home = () => {
    return(
        <>
            <div className="flex">
                <Aside />
                <main className="w-full">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default Home