import Home from "../pages/Home.jsx";
import DeleteForm from "../components/DeleteForm.jsx";
import Main from "../components/Main.jsx";
import CreateForm from "../components/CreateForm.jsx";
import UpdateForm from "../components/UpdateForm.jsx";
import CreateManualForm from "../components/CreateManualForm.jsx";
import CreateImportForm from "../components/CreateImportForm.jsx";

const routes = [{
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
        { path: "/update", Component: UpdateForm },
    ],
},
]

function getAllPaths(lista) {
    const rotasQtd = lista.length;
    const listaRotas = [];

    for (let i = 0; i < rotasQtd; i++) {
        const temp = {};
        if (lista[i].path) temp.path = lista[i].path

        if (lista[i].children) temp.children = getAllPaths(lista[i].children)

        if (temp.path) listaRotas.push(temp)
    }
    return listaRotas;
}

function treatData(lista, routeType) {
    const objectsList = {};
    for (let i = 0; i < lista.length; i++) {
        objectsList[`${lista[i].path}`] = lista[i].children;
    };
    if(routeType){
        switch (routeType) {
            case "home":
                return objectsList["/"]
            default:
                for (let i = 0; i < lista.length; i++) {
                    return objectsList[routeType]
                }
        }
    }
    
    return objectsList;
}

export const homeRotas = treatData(getAllPaths(routes), "home");

export default routes;