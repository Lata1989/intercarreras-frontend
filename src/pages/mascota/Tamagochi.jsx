import React, { useEffect, useState } from 'react';
import './Tamagochi.css';

export const Tamagochi = () => {
  const [message, setMessage] = useState({});
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new WebSocket('ws://localhost:4500');

      socket.onopen = () => {
        console.log('Conectado al WebSocket');
      };

      socket.onmessage = event => {
        try {
          const data = JSON.parse(event.data);
          console.log('JSON recibido:', data);
          setMessage(data); // Actualiza el estado con los datos recibidos
        } catch (error) {
          console.error('Error al analizar el mensaje:', error);
        }
      };

      socket.onerror = error => {
        console.error('Error WebSocket:', error);
      };

      socket.onclose = () => {
        console.log('WebSocket cerrado');
        // Intentar reconectar después de 3 segundos
        setTimeout(() => connectWebSocket(), 3000);
      };

      setWs(socket);
    };

    connectWebSocket(); // Conectar al iniciar el componente

    // Cerrar el WebSocket al desmontar el componente
    return () => ws && ws.close();
  }, []);

  const sendMessage = action => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ accion: action }));
    } else {
      console.log('WebSocket no está listo para enviar mensajes');
    }
  };

  return (
    <div className="tamagochi-container">
      <h2>Bipo</h2>
      <img
        src="https://i.imgur.com/doF33wE.gif"
        alt="Mascota"
        style={{ width: '25rem', height: 'auto' }}
      />

      <div className="info-container">
        <h3>Información de la Mascota</h3>
        <div className='info-container-stats'>
          <p>Hambre: {message.hambre}</p>
          <p>Felicidad: {message.felicidad}</p>
          <p>Sueño: {message.suenio}</p>
          <p>Limpieza: {message.limpio}</p>
          <p>Diversión: {message.diversion}</p>
          <p>Temperatura: {message.temperatura}</p>
          <p>Humedad: {message.humedad}</p>
        </div>
      </div>
      <div className="actions-container">
        <button onClick={() => sendMessage('alimentar')}>Alimentar</button>
        <button onClick={() => sendMessage('carinio')}>Dar cariño</button>
        <button onClick={() => sendMessage('dormir')}>Dormir</button>
        <button onClick={() => sendMessage('jugar')}>Jugar</button>
        <button onClick={() => sendMessage('limpiar')}>Limpiar</button>
      </div>
    </div>
  );
};
