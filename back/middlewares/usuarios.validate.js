import { loginSchema, registerSchema } from "../schemas/usuarios.js";

export function validateLogin(req, res, next) {
    console.log("Validando usuario...");

    loginSchema.validate(req.body)
        .then(() => next())
        .catch(err => {
            res.status(400).json({
                errors: err.errors
            });
        });
}

export function validateRegister(req, res, next) {
    console.log("Validando registro de usuario...");
    registerSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    })
        .then(() => next())
        .catch(err => {
            
            res.status(400).json({
                errors: err.errors
            });
        });
}