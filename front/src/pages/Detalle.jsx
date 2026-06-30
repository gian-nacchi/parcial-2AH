import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductosService } from "../services/productos.service";

const Detalle = () => {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { idProducto } = useParams();
    const { getProductoById } = useProductosService();

    useEffect(() => {
        getProductoById(idProducto)
            .then((data) => {
                setProducto(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [idProducto]);

    if (loading) {
        return (
            <p className="text-center mt-10 text-xl">
                Cargando producto...
            </p>
        );
    }

    if (error) {
        return (
            <p className="text-center mt-10 text-red-600 text-xl">
                {error}
            </p>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover"
                />

                <div className="p-8">
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mb-4">
                        {producto.categoria}
                    </span>

                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {producto.nombre}
                    </h1>

                    <p className="text-gray-600 mb-4">
                        {producto.descripcion}
                    </p>

                    <p className="mb-2">
                        <strong>Marca:</strong> {producto.marca}
                    </p>

                    <p className="text-2xl font-bold text-green-700 mb-6">
                        ${producto.precio}
                    </p>

                    <div className="flex gap-3">
                        <Link
                            to="/productos"
                            className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg transition"
                        >
                            Volver
                        </Link>

                        <a
                            href={producto.link}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                        >
                            Ver sitio
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detalle;