import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';

import './Tamagochi.css';
const maxSliderValue = 200;

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
      <div className="mascota-container">
        <div>
          <h2>Bippo</h2>
          <img
            src="https://i.imgur.com/doF33wE.gif"
            alt="Mascota"
            style={{ width: '35rem', height: 'auto' }}
          />
        </div>

        <div className="info-container">
          <div>
            <p>Hambre</p>
            <Slider
              min={0}
              max={maxSliderValue}
              value={message.hambre}
              tooltip={{
                open: true,
                placement: 'bottom',
              }}
              className="custom-slider"
            />
          </div>
          <div>
            <p>Felicidad</p>
            <Slider
              min={0}
              max={maxSliderValue}
              value={message.felicidad}
              tooltip={{
                open: true,
                placement: 'bottom',
              }}
              className="custom-slider"
            />
          </div>
          <div>
            <p>Sueño</p>
            <Slider
              min={0}
              max={maxSliderValue}
              value={message.suenio}
              tooltip={{
                open: true,
                placement: 'bottom',
              }}
              className="custom-slider"
            />
          </div>

          <div>
            <p>Limpieza</p>
            <Slider
              min={0}
              max={maxSliderValue}
              value={message.limpio}
              tooltip={{
                open: true,
                placement: 'bottom',
              }}
              className="custom-slider"
            />
          </div>
          <div>
            <p>Diversión</p>
            <Slider
              min={0}
              max={maxSliderValue}
              value={message.diversion}
              tooltip={{
                open: true,
                placement: 'bottom',
              }}
              className="custom-slider"
            />
          </div>

          <section className="stats-sensors">
            <div>
              <p>Temperatura</p>
              <p>{message.temperatura + '°C'}</p>
            </div>
            <div>
              <p>Humedad</p>
            </div>
            <div>
              <p>Luminosidad</p>
              <p>{message.luz}</p>
            </div>
          </section>
        </div>
      </div>
      {message.vivo ? (
        <div className="actions-container">
          <button onClick={() => sendMessage('alimentar')}>Alimentar</button>
          <button onClick={() => sendMessage('carinio')}>Dar cariño</button>
          <button onClick={() => sendMessage('dormir')}>Dormir</button>
          <button onClick={() => sendMessage('jugar')}>Jugar</button>
          <button onClick={() => sendMessage('limpiar')}>Limpiar</button>
        </div>
      ) : (
        <div className="actions-container">
          <button onClick={() => sendMessage('revivir')}>Revivir</button>
        </div>
      )}

      {/* <div className="actions-container">
        <button onClick={() => sendMessage('alimentar')}>Alimentar</button>
        <button onClick={() => sendMessage('carinio')}>Dar cariño</button>
        <button onClick={() => sendMessage('dormir')}>Dormir</button>
        <button onClick={() => sendMessage('jugar')}>Jugar</button>
        <button onClick={() => sendMessage('limpiar')}>Limpiar</button>
      </div> */}
    </div>
  );
};
