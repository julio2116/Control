import { createBrowserRouter } from "react-router";
import Home from "../pages/Home.jsx";
import Form from "../components/Form.jsx"
import Main from "../components/Main.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {index: true, Component: Main},
      {path: "/excluir", Component: Form}
    ]
  }
]);

export default router