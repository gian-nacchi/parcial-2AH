import * as yup from 'yup'

export const clienteSchema = yup.object({
    nombre: yup
        .string()
        .required("El nombre es requerido"),

    foto: yup
        .string()
        .required("La foto es requerida"),

    descripcion: yup
        .string()
        .required("La descripción es requerida"),

    _id: yup
        .string()
        .matches(
            /^[0-9a-fA-F]{24}$/,
            "El campo _id debe ser un ObjectId válido"
        )
        .optional()
})