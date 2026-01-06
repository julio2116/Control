import { createBrowserRouter } from "react-router";
import Home from "../pages/Home.jsx";
import DeleteForm from "../components/DeleteForm.jsx";
import Main from "../components/Main.jsx";
import CreateForm from "../components/CreateForm.jsx";
import AlterForm from "../components/AlterForm.jsx";
import CreateManualForm from "../components/CreateManualForm.jsx";
import CreateImportForm from "../components/CreateImportForm.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
        children: [
            { index: true, Component: Main },
            { path: "/baixar", Component: DeleteForm },
            {
                path: "/incluir",
                Component: CreateForm,
                children: [
                    { index: true, Component: CreateImportForm },
                    { path: "importar", Component: CreateImportForm },
                    { path: "manual", Component: CreateManualForm },
                ],
            },
            { path: "/alterar", Component: AlterForm },
        ],
    },
]);

export default router;
