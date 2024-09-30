import { useState } from "react";
import axios from "axios";  // Importar Axios

export const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();

        // Resetea mensajes previos
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                nombre: data.name,
                email: data.email,
                password: data.password,
            });

            // Si el registro fue exitoso
            setSuccess('Registro exitoso');
        } catch (err) {
            // Si hay un error
            if (err.response && err.response.data.msg) {
                setError(err.response.data.msg); // Mostrar mensaje del servidor
            } else {
                setError('Error en el registro'); // Error genérico
            }
        }
    };

    return (
        <>
            <h3>Registrarse</h3>

            <div>
                <form onSubmit={registerUser}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Ingrese su nombre"
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
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
                        placeholder="Ingrese su password"
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                    <button type="submit">Registrarse</button>
                </form>
                
                {/* Mostrar mensajes de error o éxito */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </div>
        </>
    );
};


/*
import { useState } from "react";

export const Register = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })


    const registerUser = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <h3>Registrarse</h3>

            <div>
                <form action="" onSubmit={registerUser}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" name="nombre" placeholder="Ingrese su nombre" onChange={(e) => setData({...data, name:e.target.value})}/>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Ingrese su email" onChange={(e) => setData({...data, email:e.target.value})}/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="Ingrese su password" onChange={(e) => setData({...data, password:e.target.value})}/>
                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </>
    );
}
    */