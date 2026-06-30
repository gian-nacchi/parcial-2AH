import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUsuariosService } from "../services/usuarios.service";

const Register = () => {
    const navigate = useNavigate();
    const { registro } = useUsuariosService();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        mode: "onChange",
    });

    const password = watch("password", "");
    const passwordConfirm = watch("passwordConfirm", "");

    const validaciones = {
        longitudMin: password.length >= 6,
        mayuscula: /[A-Z]/.test(password),
        minuscula: /[a-z]/.test(password),
        numero: /[0-9]/.test(password),
        simbolo: /[@$!%*?&._-]/.test(password),
    };

    const passwordsIguales =
        password === passwordConfirm &&
        password.length > 0 &&
        passwordConfirm.length > 0;

    const onSubmit = (data) => {
        registro(data.nombre, data.email, data.password)
            .then(() => {
                alert("Usuario registrado correctamente.");
                navigate("/login");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Crear cuenta
                </h1>

                <p className="text-gray-500 text-center mt-2 mb-8">
                    Registrate para acceder a la aplicación.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Nombre
                        </label>

                        <input
                            type="text"
                            placeholder="Juan Pérez"
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            autoComplete="name"
                            {...register("nombre", {
                                required: "El nombre es obligatorio",
                            })}
                        />

                        {errors.nombre && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.nombre.message}
                            </p>
                        )}
                    </div>

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
                            autoComplete="new-password"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                validate: (value) => {
                                    if (value.length < 6) return "Debe tener al menos 6 caracteres";
                                    if (!/[A-Z]/.test(value)) return "Debe tener una mayúscula";
                                    if (!/[a-z]/.test(value)) return "Debe tener una minúscula";
                                    if (!/[0-9]/.test(value)) return "Debe tener un número";
                                    if (!/[@$!%*?&._-]/.test(value)) return "Debe tener un símbolo";
                                    return true;
                                },
                            })}
                        />

                        {errors.password && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}

                        <ul className="mt-3 text-sm space-y-1">
                            <li className={validaciones.longitudMin ? "text-green-600" : "text-red-600"}>
                                {validaciones.longitudMin ? "✔" : "✖"} Mínimo 6 caracteres
                            </li>
                            <li className={validaciones.mayuscula ? "text-green-600" : "text-red-600"}>
                                {validaciones.mayuscula ? "✔" : "✖"} Una mayúscula
                            </li>
                            <li className={validaciones.minuscula ? "text-green-600" : "text-red-600"}>
                                {validaciones.minuscula ? "✔" : "✖"} Una minúscula
                            </li>
                            <li className={validaciones.numero ? "text-green-600" : "text-red-600"}>
                                {validaciones.numero ? "✔" : "✖"} Un número
                            </li>
                            <li className={validaciones.simbolo ? "text-green-600" : "text-red-600"}>
                                {validaciones.simbolo ? "✔" : "✖"} Un carácter especial
                            </li>
                        </ul>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                            Confirmar contraseña
                        </label>

                        <input
                            type="password"
                            placeholder="Repetí tu contraseña"
                            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            autoComplete="new-password"
                            {...register("passwordConfirm", {
                                required: "Confirmá la contraseña",
                                validate: (value) =>
                                    value === password || "Las contraseñas no coinciden",
                            })}
                        />

                        {errors.passwordConfirm && (
                            <p className="text-red-600 text-sm mt-1">
                                {errors.passwordConfirm.message}
                            </p>
                        )}

                        {passwordConfirm.length > 0 && (
                            <p className={`text-sm mt-2 ${passwordsIguales ? "text-green-600" : "text-red-600"}`}>
                                {passwordsIguales ? "✔ Las contraseñas coinciden" : "✖ Las contraseñas no coinciden"}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`w-full text-white font-semibold py-3 rounded-lg transition ${
                            isValid && !isSubmitting
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        {isSubmitting ? "Registrando..." : "Registrarse"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-6">
                    ¿Ya tenés una cuenta?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        Iniciar sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;