import { createBrowserRouter } from "react-router";
import Form from "../components/Form";
import Loading from "../components/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Form,
  },
  {
    path: "/letter",
    Component: Loading
  }
]);

export default router