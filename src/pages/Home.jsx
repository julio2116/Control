import { Outlet } from "react-router";
import SideMenu from "../components/SideMenu.jsx";

const Home = () => {
    return (
        <>
            <div className="flex bg-[#F7FAFF]">
                <main className="w-full flex bg-[#d4d4ff21]">
                    <SideMenu />
                    <div className="bg-[url('https://iel-ce.org.br/assets/logos/sistema-s/iel-ceara.svg')] bg-no-repeat bg-center bg-size-[60%_60%] w-full h-screen">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
};

export default Home;
