import { Link } from "react-router-dom";
import { useProductos } from "../../hooks/useProducto";

const Home = () => {
    const { productos, loading, error } = useProductos();

    if (loading)
        return (
            <div className="text-center mt-10 text-xl">
                Cargando productos...
            </div>
        );

    if (error)
        return (
            <div className="text-center mt-10 text-red-600 text-xl">
                No se pueden traer los productos
            </div>
        );

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-gray-800">
                    Administración de Productos
                </h1>

                <Link
                    to="/nuevo-producto"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow transition"
                >
                    + Nuevo producto
                </Link>
            </div>

            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                <table className="w-full">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="p-4 text-left">Imagen</th>
                            <th className="p-4 text-left">Nombre</th>
                            <th className="p-4 text-left">Marca</th>
                            <th className="p-4 text-left">Categoría</th>
                            <th className="p-4 text-left">Precio</th>
                            <th className="p-4 text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productos.map((producto) => (
                            <tr
                                key={producto._id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="p-4">
                                    <img
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                        className="w-16 h-16 object-cover rounded-lg shadow"
                                    />
                                </td>

                                <td className="p-4 font-semibold">
                                    {producto.nombre}
                                </td>

                                <td className="p-4">{producto.marca}</td>

                                <td className="p-4 capitalize">
                                    {producto.categoria}
                                </td>

                                <td className="p-4 font-bold text-green-600">
                                    ${producto.precio}
                                </td>

                                <td className="p-4">
                                    <div className="flex justify-center gap-2">
                                        <Link
                                            to={`/detalle-producto/${producto._id}`}
                                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-2 rounded transition"
                                        >
                                            👁 Ver
                                        </Link>

                                        <Link
                                            to={`/modificar-producto/${producto._id}`}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded transition"
                                        >
                                            ✏ Editar
                                        </Link>

                                        <Link
                                            to={`/borrar-producto/${producto._id}`}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition"
                                        >
                                            🗑 Borrar
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;