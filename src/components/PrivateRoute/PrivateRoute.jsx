import { Navigate } from 'react-router-dom';

// Ruta protegida: Solo permite acceso si hay un token (usuario autenticado)
export const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    return token ? children : <Navigate to="/login" />;
};
