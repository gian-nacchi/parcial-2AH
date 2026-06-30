import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useProductosService } from "../../services/productos.service";

const Nuevo = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
    });

    const navigate = useNavigate();
    const { createProducto } = useProductosService();

    const onSubmit = (formData) => {
        formData.precio = Number(formData.precio);

        createProducto(formData)
            .then(() => {
                alert("Producto creado correctamente");
                navigate("/crud");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <div className="bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold mb-8 text-center">
                    Nuevo Producto
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <div>
                        <label className="block font-medium mb-2">
                            Nombre
                        </label>

                        <input
                            type="text"
                            className="w-full border rounded-lg p-3"
                            {...register("nombre", {
                                required: "Ingrese el nombre",
                            })}
                        />

                        {errors.nombre && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.nombre.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            Precio
                        </label>

                        <input
                            type="number"
                            className="w-full border rounded-lg p-3"
                            {...register("precio", {
                                required: "Ingrese el precio",
                            })}
                        />

                        {errors.precio && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.precio.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            Marca
                        </label>

                        <input
                            type="text"
                            className="w-full border rounded-lg p-3"
                            {...register("marca")}
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            Categoría
                        </label>

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
                        <label className="block font-medium mb-2">
                            Descripción
                        </label>

                        <textarea
                            rows="4"
                            className="w-full border rounded-lg p-3"
                            {...register("descripcion")}
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            Imagen (URL)
                        </label>

                        <input
                            type="text"
                            className="w-full border rounded-lg p-3"
                            {...register("imagen")}
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            Link
                        </label>

                        <input
                            type="text"
                            className="w-full border rounded-lg p-3"
                            {...register("link")}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                            isValid
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Guardar producto
                    </button>

                </form>

            </div>
        </div>
    );
};

export default Nuevo;