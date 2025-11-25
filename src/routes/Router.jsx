import { createBrowserRouter } from "react-router";
import Form from "../components/Form";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Form,
  },
]);

export default router