import { useApi } from "./api.service";

export function useProductosService() {
    const { call } = useApi();

    // Obtener todos los productos
    const getProductos = () => call("/productos", "GET");

    // Obtener un producto por ID
    const getProductoById = (idProducto) =>
        call(`/productos/${idProducto}`, "GET");

    // Crear un producto
    const createProducto = (producto) =>
        call("/productos", "POST", producto);

    // Modificar un producto
    const updateProducto = (idProducto, producto) =>
        call(`/productos/${idProducto}`, "PUT", producto);

    // Eliminar un producto
    const deleteProducto = (idProducto) =>
        call(`/productos/${idProducto}`, "DELETE");

    return {
        getProductos,
        getProductoById,
        createProducto,
        updateProducto,
        deleteProducto,
    };
}