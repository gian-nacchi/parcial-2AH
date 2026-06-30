import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductosService } from "../services/productos.service";

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [categoria, setCategoria] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { getProductos } = useProductosService();

    const categorias = ["smartphones", "laptops", "gaming", "tablets", "audio"];

    useEffect(() => {
        setLoading(true);

        getProductos()
            .then((data) => {
                if (categoria === "") {
                    setProductos(data);
                } else {
                    setProductos(
                        data.filter(
                            (producto) => producto.categoria === categoria
                        )
                    );
                }

                setError(null);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, [categoria]);

    if (loading)
        return <p className="text-center mt-10">Cargando productos...</p>;

    if (error)
        return <p className="text-center mt-10 text-red-600">Error: {error}</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                <button
                    onClick={() => setCategoria("")}
                    className="border px-4 py-2 rounded hover:bg-gray-800 hover:text-white"
                >
                    Todos
                </button>

                {categorias.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategoria(cat)}
                        className="border px-4 py-2 rounded hover:bg-gray-800 hover:text-white"
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <h1 className="text-4xl text-center mb-8">
                Listado de Productos
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productos.map((producto) => (
                    <div
                        key={producto._id}
                        className="border rounded-xl shadow-lg bg-white overflow-hidden hover:shadow-2xl transition"
                    >
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">
                                {producto.nombre}
                            </h2>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                {producto.descripcion}
                            </p>

                            <p className="mb-2">
                                <strong>Marca:</strong> {producto.marca}
                            </p>

                            <p className="font-bold text-green-700 text-lg mb-4">
                                ${producto.precio}
                            </p>

                            <div className="flex gap-2">
                                <Link
                                    to={`/productos/${producto._id}`}
                                    className="flex-1 bg-gray-800 text-white text-center py-2 rounded hover:bg-gray-900 transition"
                                >
                                    Ver detalle
                                </Link>

                                <a
                                    href={producto.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Sitio
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Productos;