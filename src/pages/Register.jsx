import { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Alert } from 'antd';

export const Register = ({ onShowLogin }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const registerUser = async values => {
    // Resetea mensajes previos
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          nombre: values.nombre,
          email: values.email,
          password: values.password,
        }
      );

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
      <Form onFinish={registerUser} className="loginRegisterForm">
        <h2>Regístrate</h2>

        <label>Nombre</label>
        <Form.Item
          name="nombre"
          rules={[{ required: true, message: 'Por favor ingresa tu nombre!' }]}
        >
          <Input
            type="text"
            placeholder="Ingrese su nombre"
            onChange={e => setData({ ...data, name: e.target.value })}
          />
        </Form.Item>
        <label>Email</label>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Por favor ingresa tu email!' }]}
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
            onChange={e => setData({ ...data, password: e.target.value })}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Registrarse
        </Button>

        {/* Mostrar mensajes de error o éxito */}
        {error && (
          <Alert
            message={error}
            type="error"
            style={{ marginTop: 4 }}
            showIcon
            closable
          />
        )}
        {success && (
          <Alert
            message={success}
            type="success"
            style={{ marginTop: 4 }}
            showIcon
            closable
          />
        )}
        <Form.Item>
          <p style={{ color: 'white' }}>
            ¿Ya tienes una cuenta?{' '}
            <a onClick={onShowLogin} className="link">
              Inicia sesión aquí
            </a>
          </p>
        </Form.Item>
      </Form>
    </>
  );
};
