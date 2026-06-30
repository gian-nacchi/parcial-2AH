import express from 'express'
import * as controllers from "../controllers/productos.controllers.js"
import { validateProducto } from '../../middlewares/producto.valide.js'
import { validateToken } from '../../middlewares/token.validate.js'

const router = express.Router()

router.get("/productos", controllers.getProductos);
router.get("/productos/:id", controllers.getProductosId);

router.post("/productos", [validateToken, validateProducto], controllers.guardarProductos);
router.patch("/productos/:id", [validateToken, validateProducto], controllers.actualizarProductos);
router.put("/productos/:id", [validateToken, validateProducto], controllers.reemplazarProducto);
router.delete("/productos/:id", validateToken, controllers.borrarProductos);

export default router