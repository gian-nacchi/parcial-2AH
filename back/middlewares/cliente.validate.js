import { clienteSchema } from "../schemas/clientes.js"

export function validateCliente(req, res, next) {
    clienteSchema
        .validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        .then((value) => {
            req.body = value
            next()
        })
        .catch((err) => {
            res.status(400).json({
                error: err.errors
            })
        })
}