import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
}