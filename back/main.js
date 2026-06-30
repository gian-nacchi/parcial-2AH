import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import ProductosRoutes from "./routes/productos.routes.js";
import ProductosRoutesApi from "./api/routes/productos.routes.js";
import ClientesRoutes from "./api/routes/clientes.routes.js";
import UsuariosRoutesApi from "./api/routes/usuarios.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.static("public"));
app.use("/", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(ProductosRoutes);
app.use("/api", ProductosRoutesApi);
app.use("/api", ClientesRoutes);
app.use("/api/usuarios", UsuariosRoutesApi);

app.listen(3333, () => {
    console.log("Servidor funcionando en http://localhost:3333");
});