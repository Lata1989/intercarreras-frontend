import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Input, Alert } from 'antd';
import { useNavigate } from 'react-router-dom'; // Importar Link
import { Register } from './Register'; // Asegúrate de que la ruta sea correcta

export const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false); // Nuevo estado para controlar la vista (entre login y register)
  const navigate = useNavigate(); // Para redirigir al usuario después de login

  const loginUser = async values => {
    setError(''); // Limpiar error antes de enviar

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email: values.email,
          password: values.password,
        }
      );

      // Guardar el JWT en localStorage
      localStorage.setItem('token', response.data.token);

      // Redirigir al usuario a la página protegida
      navigate('/tamagochi');
      // Refrescar la página completa
      window.location.reload(); // Refresca la página después de la redirección
    } catch (err) {
      setError('Credenciales incorrectas o error de conexión');
    }
  };

  const handleShowRegister = () => {
    setShowRegister(true); // Mostrar el formulario de registro
  };

  const handleShowLogin = () => {
    setShowRegister(false); // Volver a mostrar el formulario de inicio de sesión
  };

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <section className="iconBigLogin">
          <img src="https://i.imgur.com/doF33wE.gif" alt="ICON-BIG-LOGIN" />
        </section>
        {!showRegister ? (
          // Formulario de inicio de sesión
          <Form onFinish={loginUser} className="loginRegisterForm">
            <h2>Inicia sesión</h2>
            <label>Email</label>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Por favor ingresa tu email!' },
              ]}
            >
              <Input
                type="email"
                placeholder="Ingrese su email"
                onChange={e => setData({ ...data, email: e.target.value })}
              />
            </Form.Item>

            <label>Password</label>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Por favor ingresa tu contraseña!' },
              ]}
            >
              <Input
                type="password"
                placeholder="Ingrese su contraseña"
                style={{ width: '100%' }}
                onChange={e => setData({ ...data, password: e.target.value })}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Iniciar sesión
            </Button>

            {error && (
              <Alert
                message={error}
                type="error"
                style={{ marginTop: 5 }}
                showIcon
                closable
              />
            )}

            <Form.Item>
              <p style={{ color: 'white' }}>
                ¿No tienes una cuenta?{' '}
                <a onClick={handleShowRegister} className="link">
                  Regístrate aquí
                </a>
              </p>
            </Form.Item>
          </Form>
        ) : (
          // Formulario de registro
          <Register onShowLogin={handleShowLogin} />
        )}
      </div>
    </div>
  );
};
