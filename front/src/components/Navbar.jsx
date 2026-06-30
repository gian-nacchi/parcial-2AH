import { Link } from "react-router-dom";
import { useEmail, useLogout } from "../contexts/session.context";

const Navbar = () => {
    const email = useEmail();
    const logout = useLogout();

    return (
        <nav className="bg-gray-900 text-white shadow">
            <div className="container mx-auto flex justify-between items-center px-4 py-4">

                <Link
                    to="/"
                    className="text-2xl font-bold hover:text-orange-400 transition"
                >
                    Mi Tienda
                </Link>

                <div className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="hover:text-orange-400 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/productos"
                        className="hover:text-orange-400 transition"
                    >
                        Productos
                    </Link>

                    {!email ? (
                        <Link
                            to="/login"
                            className="hover:text-orange-400 transition"
                        >
                            Login
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/crud"
                                className="hover:text-orange-400 transition"
                            >
                                Administrar
                            </Link>

                            <span className="text-gray-300 text-sm">
                                {email}
                            </span>

                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                            >
                                Salir
                            </button>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;