import * as yup from 'yup'

export const productoSchema = yup.object({
    nombre: yup
        .string()
        .required("El campo nombre es requerido"),

    precio: yup
        .number()
        .integer()
        .positive()
        .required("El campo precio es requerido"),

    descripcion: yup
        .string()
        .required("El campo descripción es requerido"),

    _id: yup
        .string()
        .matches(
            /^[0-9a-fA-F]{24}$/,
            "El campo _id debe ser un ObjectId válido"
        )
        .optional()
})