import * as service from "../../services/clientes.service.js";

export function getProductosCliente(req, res) {
    const id = req.params.id;

    service.getProductosPorCliente(id)
        .then(productos => res.status(200).json(productos))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Error al obtener productos del cliente" });
        });
}

export function crearCliente(req, res) {
    const cliente = {
        nombre: req.body?.nombre,
        foto: req.body?.foto,
        descripcion: req.body?.descripcion
    };

    service.createCliente(cliente)
        .then(() => res.status(201).json({ message: "Cliente creado" }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Error al crear cliente" });
        });
}

export function obtenerClientes(req, res) {
    service.getClientes()
        .then(clientes => res.json(clientes))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Error al obtener clientes" });
        });
        
}