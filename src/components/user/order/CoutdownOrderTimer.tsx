'use client';

import { useCallback, useEffect, useState } from 'react';

interface TimeLeft {
  minutes: string;
  seconds: string;
}

export default function CountdownOrderTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    minutes: '15',
    seconds: '00',
  });

  const [timerExpired, setTimerExpired] = useState(false);

  const startCountdown = useCallback(() => {
    // Establecer un tiempo de 15 minutos para completar el pedido
    const endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + 15);

    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const difference = endTime.getTime() - currentTime.getTime();

      if (difference <= 0) {
        clearInterval(intervalId);
        setTimerExpired(true);
        setTimeLeft({ minutes: '00', seconds: '00' });
        return;
      }

      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, '0');
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, '0');

      setTimeLeft({ minutes, seconds });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const cleanup = startCountdown();
    return cleanup;
  }, [startCountdown]);

  if (timerExpired) {
    return (
      <div className="text-center py-2 px-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600 font-medium">
          El tiempo para completar tu pedido ha expirado.
          Los artículos en tu carrito siguen disponibles.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="inline-flex items-center bg-green-50 rounded-lg p-2">
        <div className="text-green-800 font-medium mr-2">Tiempo restante:</div>
        <div className="flex items-center">
          <div className="flex items-center justify-center bg-green-dark text-whiteygreen w-8 h-8 md:w-10 md:h-10 rounded">
            <span className="text-lg md:text-xl font-semibold">{timeLeft.minutes}</span>
          </div>
          <span className="mx-1 text-lg md:text-xl text-green-dark">:</span>
          <div className="flex items-center justify-center bg-green-dark text-whiteygreen w-8 h-8 md:w-10 md:h-10 rounded">
            <span className="text-lg md:text-xl font-semibold">{timeLeft.seconds}</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-600 mt-2">
        Completa tu pedido para asegurar la disponibilidad de los productos y precios actuales.
      </p>
    </div>
  );
}