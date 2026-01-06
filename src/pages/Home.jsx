import { Outlet } from "react-router";
import SideMenu from "../components/SideMenu.jsx";

const Home = () => {
    return (
        <>
            <div className="flex bg-[#F7FAFF] w-full h-full">
                <main className="w-full flex">
                    <SideMenu />
                    <div className="w-full flex flex-col">
                        <div
                            className="bg-no-repeat bg-center fixed bg-size-[95%_95%] md:bg-size-[60%_60%] w-full h-screen bg-[#d4d4ff21]"
                            style={{ backgroundImage: "url(/iel-ceara.svg)" }}
                        ></div>
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
};

export default Home;
