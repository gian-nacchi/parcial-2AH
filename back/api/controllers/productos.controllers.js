import * as service from "../../services/productos.service.js"
import { ObjectId } from "mongodb";

export function getProductos(req, res) {
    const filter = req.query
    return service.getProductos(filter)
        .then(productos => res.status(200).json(productos))
        .catch(err => res.status(500).json({ message: "No se pueden obtener los productos" }))
}

export function getProductosId(req, res) {
    const id = req.params.id

    return service.getProductosId(id)
    .then(producto => { 
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
       
        res.status(200).json(producto); 
    })
    .catch(err => res.status(500).json({ message: 'Error interno del servidor' }))
}

export function borrarProductos(req, res) {
    const id = req.params.id // Obtenemos el ID de la ruta

    service.borrarProductos(id)
        .then(resultado => {
            if (resultado.deletedCount === 0) {
                return res.status(404).json({ message: "No se encontró el producto para eliminar" })
            }
            res.status(200).json({ message: "Producto eliminado correctamente" })
        })
        .catch(err => res.status(500).json({ message: "Error al intentar eliminar el producto" }))
}

export function guardarProductos(req, res) {
    // Usamos req.body para capturar los datos del JSON de Postman
    const producto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        marca: req.body.marca,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        link: req.body.link,
        clienteId: req.body.clienteId 
            ? new ObjectId(req.body.clienteId) 
            : null
    }

    // Llamamos al servicio para insertar en la DB[cite: 1]
    service.saveProductos(producto)
        .then(producto => res.status(201).json(producto))
        .catch(err => res.status(500).json({ message: "Error al guardar" }))
}

export function reemplazarProducto(req, res) {
    const id = req.params.id;

    const datos = {
        nombre: req.body?.nombre,
        precio: req.body?.precio,
        marca: req.body?.marca,
        categoria: req.body?.categoria,
        descripcion: req.body?.descripcion,
        imagen: req.body?.imagen,
        link: req.body?.link
    };

    service.editProducto(id, datos)
        .then(result => {
            if (result.matchedCount === 0) {
                return res.status(404).json({
                    message: "Producto no encontrado"
                });
            }

            res.json({
                message: "Producto actualizado"
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: "No se pudo reemplazar el producto"
            });
        });
}

export function actualizarProductos(req, res) {
    const id = req.params.id;

    const datos = {
        nombre: req.body?.nombre,
        precio: req.body?.precio,
        marca: req.body?.marca,
        categoria: req.body?.categoria,
        descripcion: req.body?.descripcion,
        imagen: req.body?.imagen,
        link: req.body?.link
    };

    service.editProducto(id, datos)
        .then(result => {
            if (result.matchedCount === 0) {
                res.status(404).json({ message: "No se encontró el producto" });
                return;
            }

            res.status(200).json({ message: "Producto actualizado" });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "No se pudo actualizar el producto" });
        });
        
}