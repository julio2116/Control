
import { Outlet } from "react-router";
import SideMenu from "../components/SideMenu.jsx";

const Home = () => {
    return (
        <div className="flex w-full min-h-screen">
            <SideMenu />
            <main className="relative flex-1 min-h-screen overflow-y-auto">
                <div
                    className="
                        fixed inset-0
                        md:left-[15%]
                        bg-no-repeat bg-center
                        bg-[length:95%_95%]
                        md:bg-[length:60%_60%]
                        bg-[#d4d4ff21]
                        -z-10
                    "
                    style={{
                        backgroundImage: "url(/iel-ceara.svg)",
                    }}
                />
                <div className="relative z-10 min-h-screen">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Home;
