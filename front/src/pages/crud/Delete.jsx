import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProductosService } from "../../services/productos.service";

const Delete = () => {
    const [producto, setProducto] = useState(null);

    const { idProducto } = useParams();
    const navigate = useNavigate();

    const { getProductoById, deleteProducto } = useProductosService();

    useEffect(() => {
        getProductoById(idProducto)
            .then((data) => setProducto(data))
            .catch((err) => console.log(err));
    }, [idProducto]);

    const handleSubmit = (e) => {
        e.preventDefault();

        deleteProducto(idProducto)
            .then(() => {
                alert("Producto eliminado correctamente");
                navigate("/crud");
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">
                    Eliminar producto
                </h1>

                <p className="text-lg mb-6">
                    ¿Deseás borrar{" "}
                    <strong>{producto?.nombre}</strong>?
                </p>

                <form onSubmit={handleSubmit} className="flex justify-center gap-4">
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                    >
                        Sí, borrar
                    </button>

                    <Link
                        to="/crud"
                        className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg"
                    >
                        No, volver
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Delete;