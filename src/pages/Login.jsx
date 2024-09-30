export const Login = () => {

    const loginUser = (e) => {
        e.preventDefault();
    } 

    return(
        <>
        <h3>Ingresar</h3>
        <div>
                <form action="" onSubmit={loginUser}>
                    <label htmlFor="">Email:</label>
                    <input type="email" name="" id="" placeholder="Ingrese su email" />
                    <label htmlFor="">Password:</label>
                    <input type="password" name="" id="" placeholder="Ingrese su nombre" />
                    <button type="submit">Ingresar</button>
                </form>
            </div>
        </>
    );
}