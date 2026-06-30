import { useApi } from "./api.service";

export function useUsuariosService() {
    const { call } = useApi();

    const login = (credenciales) =>
        call("/usuarios/login", "POST", credenciales);

    const registro = (nombre, email, password) =>
        call("/usuarios", "POST", {
            nombre,
            email,
            password,
        });

    return {
        login,
        registro,
    };
}