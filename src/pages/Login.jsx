import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate(); // Para redirigir al usuario después de login

    const loginUser = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar error antes de enviar

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: data.email,
                password: data.password,
            });

            // Guardar el JWT en localStorage
            localStorage.setItem('token', response.data.token);

            // Redirigir al usuario a la página protegida
            navigate('/tamagochi');
            // Refrescar la página completa
            window.location.reload();  // Refresca la página después de la redirección
        } catch (err) {
            setError('Credenciales incorrectas o error de conexión');
        }
    };

    return (
        <>
            <h3>Ingresar</h3>
            <div>
                <form onSubmit={loginUser}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Ingrese su email"
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Ingrese su contraseña"
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                    <button type="submit">Ingresar</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </>
    );
};


/*
import { useState } from "react";

export const Login = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const loginUser = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <h3>Ingresar</h3>
            <div>
                <form action="" onSubmit={loginUser}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Ingrese su email" onChange={(e) => setData({ ...data, email: e.target.value })} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="Ingrese su nombre" onChange={(e) => setData({ ...data, password: e.target.value })} />
                    <button type="submit">Ingresar</button>
                </form>
            </div>
        </>
    );
}
*/