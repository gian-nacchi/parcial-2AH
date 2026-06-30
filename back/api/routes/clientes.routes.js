import express from "express";
import {
    crearCliente,
    obtenerClientes,
    getProductosCliente
} from "../controllers/clientes.controllers.js";

const router = express.Router();

router.get("/clientes", obtenerClientes);
router.post("/clientes", crearCliente);
router.get("/clientes/:id/productos", getProductosCliente);

export default router;