import { Outlet } from "react-router";
import SideMenu from "../components/SideMenu.jsx";

const Home = () => {
    return (
        <>
            <div className="flex">
                <main className="w-full flex">
                    <SideMenu />
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default Home;
