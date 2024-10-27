import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import './Navbar.css';

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar si el usuario está logeado comprobando el token en localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Si existe el token, setIsLoggedIn será true
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
    setIsLoggedIn(false);
    navigate('/'); // Redirigir al usuario a la página de home
  };

  return (
    <nav className="navbar">
      <section onClick={() => navigate('/')}>
        <img
          src="https://img.icons8.com/?size=100&id=jUbBVjC028KV&format=png&color=000000"
          alt="ICON"
        />
        <h2>Tamagotchi</h2>
      </section>

      <div>
        {isLoggedIn ? (
          <>
            <LogoutOutlined className="navbar-icon" onClick={handleLogout} />
          </>
        ) : (
          <section>
            {/*si el path no es "/login" */}
            {/* <LoginOutlined
                className="navbar-icon"
                onClick={() => navigate('/login')}
              /> */}
            {/* {location.pathname !== '/login' && (
              <LoginOutlined
                className="navbar-icon"
                onClick={() => navigate('/login')}
              />
            )} */}
          </section>
        )}
      </div>
    </nav>
  );
};
