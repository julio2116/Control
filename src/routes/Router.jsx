import { createBrowserRouter } from "react-router";
import Home from "../pages/Home.jsx";
import Form from "../components/Form.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {index: true, Component: Form}
    ]
  }
]);

export default router