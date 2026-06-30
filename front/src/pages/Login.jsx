import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "../contexts/session.context";
import { useUsuariosService } from "../services/usuarios.service";

const Login = () => {
    const navigate = useNavigate();
    const onLogin = useLogin();
    const { login } = useUsuariosService();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data) => {
        login({
            email: data.email,
            password: data.password,
        })
            .then((usuario) => {
                onLogin(usuario.token, usuario);
                navigate("/");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Iniciar sesión
                </h1>

                <p className="text-gray-500 text-center mt-2 mb-8">
                    Ingresá para administrar la aplicación.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="correo@ejemplo.com"
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            autoComplete="email"
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Ingresá un email válido",
                                },
                            })}
                        />

                        {errors.email && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            placeholder="********"
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            autoComplete="current-password"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                            })}
                        />

                        {errors.password && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full text-white font-semibold py-3 rounded-lg transition ${
                            isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {isSubmitting ? "Ingresando..." : "Ingresar"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    ¿No tenés cuenta?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        Registrate
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;