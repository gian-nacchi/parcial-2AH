import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";
import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Productos from "../pages/Productos";
import Register from "../pages/Register";
import Detalle from "../pages/Detalle";

import CrudHome from "../pages/crud/Home";
import Nuevo from "../pages/crud/Nuevo";
import Delete from "../pages/crud/Delete";
import CrudDetalle from "../pages/crud/Detalle";
import Modificar from "../pages/crud/Modificar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "productos",
                element: <Productos />
            },
            {
                path: "productos/:idProducto",
                element: <Detalle />
            },

            // Rutas públicas
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "logout",
                element: <Logout />
            },

            // Rutas protegidas
            {
                path: "crud",
                element: (
                    <PrivateRoute>
                        <CrudHome />
                    </PrivateRoute>
                )
            },
            {
                path: "nuevo-producto",
                element: (
                    <PrivateRoute>
                        <Nuevo />
                    </PrivateRoute>
                )
            },
            {
                path: "detalle-producto/:idProducto",
                element: (
                    <PrivateRoute>
                        <CrudDetalle />
                    </PrivateRoute>
                )
            },
            {
                path: "modificar-producto/:idProducto",
                element: (
                    <PrivateRoute>
                        <Modificar />
                    </PrivateRoute>
                )
            },
            {
                path: "borrar-producto/:idProducto",
                element: (
                    <PrivateRoute>
                        <Delete />
                    </PrivateRoute>
                )
            },

            {
                path: "*",
                element: <div>404</div>
            }
        ]
    }
]);

export default router;