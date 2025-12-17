import { createBrowserRouter } from "react-router";
import Home from "../pages/Home.jsx";
import DeleteForm from "../components/DeleteForm.jsx"
import Main from "../components/Main.jsx";
import CreateForm from "../components/CreateForm.jsx";
import AlterForm from "../components/AlterForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {index: true, Component: Main},
      {path: "/deletar", Component: DeleteForm},
      {path: "/criar", Component: CreateForm},
      {path: "/alterar", Component: AlterForm},
    ]
  }
]);

export default router