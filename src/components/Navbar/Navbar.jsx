import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Verificar si el usuario está logeado comprobando el token en localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Si existe el token, setIsLoggedIn será true
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
        setIsLoggedIn(false);
        navigate('/'); // Redirigir al usuario a la página de login
    };

    return (
        <nav>
            {isLoggedIn ? (
                <>
                    <Link to="/tamagochi">Tamagochi</Link>
                    <button onClick={handleLogout}>Salir</button>
                </>
            ) : (
                <>
                    <Link to="/">Home</Link>
                    <Link to="/register">Registrarse</Link>
                    <Link to="/login">Login</Link>
                </>
            )}
        </nav>
    );
};


/*
import { Link } from "react-router-dom";



export const Navbar = () => {
    return(
        <>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
            </nav>
        </>
    );
}
*/