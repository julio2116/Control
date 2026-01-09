import { Outlet, Link } from "react-router";

const CreateForm = () => {
    return (
        <>
            <div className="z-[10] flex flex-col items-center justify-center mt-[90px] md:mt-0 min-h-screen w-full overflow-y-auto py-10">
                <div className="flex gap-4 justify-center bg-transparent mb-5">
                    <Link
                        to="importar"
                        className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold
                        hover:bg-blue-700 transition-all active:scale-[0.97]"
                    >
                        Importar
                    </Link>

                    <Link
                        to="manual"
                        className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold
                        hover:bg-blue-700 transition-all active:scale-[0.97]"
                    >
                        Manual
                    </Link>
                </div>
                <Outlet />
            </div>
        </>
    );
};

export default CreateForm;
