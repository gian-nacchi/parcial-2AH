import { createContext, useContext, useState } from "react";

export const Session = createContext();

export function useSession() {
    return useContext(Session);
}

export function useUsuario() {
    const { usuario } = useSession();
    return usuario;
}

export function useEmail() {
    const { usuario } = useSession();
    return usuario?.email;
}

export function useLogin() {
    const { onLogin } = useSession();
    return onLogin;
}

export function useLogout() {
    const { onLogout } = useSession();
    return onLogout;
}

export function useToken() {
    const { token } = useSession();
    return token;
}

export function SessionProvider({ children }) {
    const sessionGuardada = JSON.parse(localStorage.getItem("session"));

    const [usuario, setUsuario] = useState(sessionGuardada?.usuario || null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    const onLogin = (jwt, usuario) => {
        localStorage.setItem("session", JSON.stringify({ usuario }));
        localStorage.setItem("token", jwt);

        setUsuario(usuario);
        setToken(jwt);
    };

    const onLogout = () => {
        localStorage.clear();
        setUsuario(null);
        setToken(null);
    };

    return (
        <Session.Provider value={{ usuario, token, onLogin, onLogout }}>
            {children}
        </Session.Provider>
    );
} 