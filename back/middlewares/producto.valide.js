import { productoSchema } from "../schemas/productos.js";

export function validateProducto(req, res, next) {
    console.log("Validando producto...");

    productoSchema
        .validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        .then((value) => {
            req.body = value;
            console.log("Producto válido");
            next();
        })
        .catch((err) => {
            console.log("Producto inválido");
            res.status(400).json({
                error: err.errors
            });
        });
}