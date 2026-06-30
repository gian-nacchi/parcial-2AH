import { Navigate } from "react-router-dom";
import { useToken } from "../contexts/session.context";

const PrivateRoute = ({ children }) => {
    const token = useToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;