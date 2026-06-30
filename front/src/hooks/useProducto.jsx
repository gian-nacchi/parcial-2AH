import { useEffect, useState } from "react";
import { useProductosService } from "../services/productos.service";

export const useProducto = (idProducto) => {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { getProductoById } = useProductosService();

    useEffect(() => {
        getProductoById(idProducto)
            .then((data) => {
                setProducto(data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => setLoading(false));
    }, [idProducto]);

    return { producto, loading, error };
};

export const useProductos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { getProductos } = useProductosService();

    useEffect(() => {
        getProductos()
            .then((data) => {
                setProductos(data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => setLoading(false));
    }, []);

    return { productos, loading, error };
};