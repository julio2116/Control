import { useEffect, useState } from "react";
import FloatingInput from "./FloatingInput";

const Login = () => {
    const [token, setToken] = useState("");
    const [submitLogin, setSubmitLogin] = useState({});

    useEffect(() => {
        if(!submitLogin.email || !submitLogin.senha) return
        (async () => {
            const login = await fetch("api/apiLogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify( submitLogin ),
            });

            const token = await login.json();
            setToken(token);
        })();
    }, [submitLogin]);

    useEffect(()=>{

    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        Object.values(data).forEach((item) => {
            if (!item) {
                throw new Error("Preencha todos os campos");
            }
        });
        console.log(data);
        setSubmitLogin(data);
    }

    return (
        <div className="h-full z-[1] flex items-center justify-center px-[5%] w-full">
            <form
                className="relative flex flex-col gap-5 backdrop-blur-lg text-black shadow-2xl rounded-2xl p-6 border border-gray-100 max-w-[400px] w-full"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="absolute -z-10 inset-0 bg-white/40 backdrop-blur-md rounded-2xl" />

                <h2 className="text-2xl font-semibold text-center">Login</h2>
                <FloatingInput name="email" label="Email" />
                <FloatingInput name="senha" label="Senha" />
                <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold
            hover:bg-blue-700 transition-all active:scale-[0.97]"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
