import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

export const registerSchema = yup.object().shape({
    nombre: yup
        .string()
        .required("El nombre es obligatorio"),

    email: yup
        .string()
        .email("Email inválido")
        .required("El email es obligatorio"),

    password: yup
        .string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .matches(/[A-Z]/, "Debe contener una mayúscula")
        .matches(/[a-z]/, "Debe contener una minúscula")
        .matches(/[0-9]/, "Debe contener un número")
        .matches(/[@$!%*?&]/, "Debe contener un carácter especial"),
});