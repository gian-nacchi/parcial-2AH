
import express from "express"
import * as controller from "../controllers/productos.controllers.js"

const route = express.Router()

route.get("/productos", controller.getProductos)


export default route