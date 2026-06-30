import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProductosService } from "../../services/productos.service";
import { useProducto } from "../../hooks/useProducto";

const Modificar = () => {
    const navigate = useNavigate();
    const { idProducto } = useParams();

    const { updateProducto } = useProductosService();
    const { producto, loading, error } = useProducto(idProducto);

    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid, errors }
    } = useForm({
        mode: "onChange"
    });

    useEffect(() => {
        if (producto) {
            reset(producto);
        }
    }, [producto, reset]);

    const onSubmit = (formData) => {
        const productoEditado = {
            ...formData,
            precio: Number(formData.precio)
        };

        updateProducto(idProducto, productoEditado)
            .then(() => {
                alert("Producto modificado correctamente");
                navigate("/crud");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    if (loading) return <div className="text-center mt-10 text-xl">Cargando producto...</div>;
    if (error) return <div className="text-center mt-10 text-red-600 text-xl">No se pudo cargar el producto</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Modificar producto
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block font-medium mb-2">Nombre</label>
                        <input
                            type="text"
                            className="w-full border rounded-lg p-3"
                            {...register("nombre", {
                                required: "El nombre es obligatorio"
                            })}
                        />
                        {errors.nombre && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.nombre.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Precio</label>
                        <input
                            type="number"
                            className="w-full border rounded-lg p-3"
                            {...register("precio", {
                                required: "El precio es obligatorio"
                            })}
                        />
                        {errors.precio && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.precio.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Marca</label>
                        <input
                            type="text"
                            className="w-full border rounded-lg p-3"
                            {...register("marca")}
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Categoría</label>
                        <select
                            className="w-full border rounded-lg p-3"
                            {...register("categoria")}
                        >
                            <option value="smartphones">Smartphones</option>
                            <option value="laptops">Laptops</option>
                            <option value="gaming">Gaming</option>
                            <option value="tablets">Tablets</option>
                            <option value="audio">Audio</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Descripción</label>
                        <textarea
                            rows="4"
                            className="w-full border rounded-lg p-3"
                            {...register("descripcion")}
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Imagen</label>
                        <input
                            type="text"
                            className="w-full border rounded-lg p-3"
                            {...register("imagen")}
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Link</label>
                        <input
                            type="text"
                            className="w-full border rounded-lg p-3"
                            {...register("link")}
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`flex-1 py-3 rounded-lg text-white font-semibold transition ${
                                isValid
                                    ? "bg-yellow-500 hover:bg-yellow-600"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Guardar cambios
                        </button>

                        <Link
                            to="/crud"
                            className="flex-1 bg-gray-800 hover:bg-gray-900 text-white text-center py-3 rounded-lg"
                        >
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modificar;