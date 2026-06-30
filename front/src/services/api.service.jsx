import { useNavigate } from "react-router-dom";
import { useToken } from "../contexts/session.context";

export function useApi() {
    const token = useToken();
    const navigate = useNavigate();

    const call = (uri, method = "GET", body = null) => {
        const config = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (body) {
            config.body = JSON.stringify(body);
        }

        return fetch("http://localhost:3333/api" + uri, config)
            .then((res) => {
                if (res.ok) return res.json();

                if (res.status === 401) {
                    navigate("/login");
                    throw new Error("No autorizado");
                }

                return res.json().then(err => {
                    throw new Error(err.message || "Error en la solicitud");
                });
            });
    };

    return { call };
}