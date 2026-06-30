import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">

            <h1 className="text-5xl font-bold text-gray-800 mb-6">
                Bienvenido a Mi Tienda
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                Este proyecto fue desarrollado con <strong>React</strong>,
                <strong> Node.js</strong>, <strong>Express</strong>,
                <strong> MongoDB</strong> y autenticación mediante
                <strong> JWT</strong>.
            </p>

            <div className="flex justify-center gap-4">
                <Link
                    to="/productos"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                    Ver productos
                </Link>

                <Link
                    to="/login"
                    className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                    Iniciar sesión
                </Link>
            </div>

        </div>
    );
};

export default Home;