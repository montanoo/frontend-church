import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error'; 
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Esconder el mensaje después de 3 segundos
    setVisible(true); // Reset visibility on new notification
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); 

    return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
  }, [message]); // Vuelve a ejecutar el efecto cada vez que `message` cambie

  if (!visible) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
    >
      {message}
    </div>
  );
};

export default Notification;

