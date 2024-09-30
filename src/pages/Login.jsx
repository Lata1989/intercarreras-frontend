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