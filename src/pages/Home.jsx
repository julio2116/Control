import { Outlet } from "react-router";
import SideMenu from "../components/SideMenu.jsx";
import bgImage from "/iel-ceara.svg"

const Home = () => {
    return (
        <>
            <div className="flex bg-[#F7FAFF]">
                <main className="w-full flex bg-[#d4d4ff21]">
                    <SideMenu />
                    <div className="bg-no-repeat bg-center bg-size-[60%_60%] w-full h-screen"
                    style={{ backgroundImage: `url(${bgImage})` }}>
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
};

export default Home;
