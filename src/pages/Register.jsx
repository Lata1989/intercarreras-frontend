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