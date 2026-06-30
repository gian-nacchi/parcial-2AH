import { createPage } from "../page/utils.js"
import * as service from "../services/productos.service.js"
import * as view from "../views/productos.views.js"

export function getProductos(req, res) {
    const filter = req.query
    service.getProductos(filter)
        .then(productos => res.send(view.createProductList(productos)))
        .catch(err => res.send("No se pudo leer el archivo"))
}
