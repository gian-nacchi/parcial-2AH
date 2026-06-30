import { Link, useParams } from "react-router-dom";
import { useProducto } from "../../hooks/useProducto";

const Detalle = () => {
    const { idProducto } = useParams();
    const { producto, loading, error } = useProducto(idProducto);

    if (loading)
        return (
            <div className="text-center mt-10 text-xl">
                Cargando producto...
            </div>
        );

    if (error)
        return (
            <div className="text-center mt-10 text-red-600 text-xl">
                No se encontró el producto
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-2">
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full h-full object-cover"
                    />

                    <div className="p-8">
                        <h1 className="text-3xl font-bold mb-4">
                            {producto.nombre}
                        </h1>

                        <p className="text-gray-600 mb-4">
                            {producto.descripcion}
                        </p>

                        <p className="mb-2">
                            <strong>ID:</strong> {producto._id}
                        </p>

                        <p className="mb-2">
                            <strong>Marca:</strong> {producto.marca}
                        </p>

                        <p className="mb-2">
                            <strong>Categoría:</strong> {producto.categoria}
                        </p>

                        <p className="text-2xl font-bold text-green-600 mb-6">
                            ${producto.precio}
                        </p>

                        <div className="flex gap-3">
                            <Link
                                to="/crud"
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
        </div>
    );
};

export default Detalle;