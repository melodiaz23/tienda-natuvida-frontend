'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const Timer3: React.FC = () => {
  const path = usePathname();

  const [countDownTime, setCountDownTime] = useState<TimeLeft>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Use useRef to store the interval ID

  const getTimeDifference = (countDownTime: number) => {
    const currentTime = new Date().getTime();
    const timeDifference = countDownTime - currentTime;

    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000))
      .toString()
      .padStart(2, '0');
    const hours = Math.floor(
      (timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
    )
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor(
      (timeDifference % (60 * 60 * 1000)) / (1000 * 60)
    )
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000)
      .toString()
      .padStart(2, '0');

    if (timeDifference < 0) {
      setCountDownTime({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      });
      if (intervalRef.current) clearInterval(intervalRef.current); // Clear the interval when the countdown is over
    } else {
      setCountDownTime({
        days,
        hours,
        minutes,
        seconds,
      });
    }
  };

  const startCountDown = useCallback(() => {
    const countDownDate = new Date(2025, 2, 30, 0, 0, 0).getTime();

    intervalRef.current = setInterval(() => {
      getTimeDifference(countDownDate);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Cleanup interval on component unmount
    };
  }, []);

  useEffect(() => {
    const cleanup = startCountDown();
    return cleanup; // Cleanup on unmount
  }, [startCountDown]);

  if (countDownTime.days === '00' && countDownTime.hours === '00') {
    return null;
  }

  if (path === '/checkout')
    return (
      <div>
        <div className="flex flex-col">
          <p className="text-center text-xs text-green-dark font-semibold py-2">
            Tiempo restante
          </p>
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="flex justify-center gap-4">
              <div className="flex flex-col gap-2 relative">
                <div className="h-10 w-10 flex justify-center items-center bg-[#133E29] rounded-lg">
                  <span className="text-xl font-semibold text-[#7BC19F]">
                    {countDownTime?.days}
                  </span>
                </div>
                <span className="text-[#133E29] text-xs text-center capitalize">
                  {countDownTime?.days === '01' ? 'Día' : 'Días'}
                </span>
              </div>
              <div className="flex flex-col gap-2 relative">
                <div className="h-10 w-10 flex justify-center items-center bg-[#133E29] rounded-lg">
                  <span className="text-xl font-semibold text-[#7BC19F]">
                    {countDownTime?.hours}
                  </span>
                </div>
                <span className="text-[#133E29] text-xs text-center font-medium">
                  {countDownTime?.hours === '01' ? 'Hora' : 'Horas'}
                </span>
              </div>
              <div className="flex flex-col gap-2 relative">
                <div className="h-10 w-10 flex justify-center items-center bg-[#133E29] rounded-lg">
                  <span className="text-xl font-semibold text-[#7BC19F]">
                    {countDownTime?.minutes}
                  </span>
                </div>
                <span className="text-[#133E29] text-xs text-center capitalize">
                  {countDownTime?.minutes === '01' ? 'Minuto' : 'Minutos'}
                </span>
              </div>
              <div className="flex flex-col gap-2 relative">
                <div className="h-10 w-10 flex justify-center items-center bg-[#133E29] rounded-lg">
                  <span className="text-xl font-semibold text-[#7BC19F]">
                    {countDownTime?.seconds}
                  </span>
                </div>
                <span className="text-[#133E29] text-xs text-center capitalize">
                  {countDownTime?.seconds === '01' ? 'Segundo' : 'Segundos'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex justify-center gap-4">
          <div className="flex flex-col gap-2 relative">
            <div className="h-16 w-16 flex justify-center items-center bg-[#133E29] rounded-lg">
              <span className="text-3xl font-semibold text-[#7BC19F]">
                {countDownTime?.days}
              </span>
            </div>
            <span className="text-[#133E29] text-xs text-center capitalize">
              {countDownTime?.days === '01' ? 'Día' : 'Días'}
            </span>
          </div>
          <div className="flex flex-col gap-2 relative">
            <div className="h-16 w-16 flex justify-center items-center bg-[#133E29] rounded-lg">
              <span className="text-3xl font-semibold text-[#7BC19F]">
                {countDownTime?.hours}
              </span>
            </div>
            <span className="text-[#133E29] text-xs text-center font-medium">
              {countDownTime?.hours === '01' ? 'Hora' : 'Horas'}
            </span>
          </div>
          <div className="flex flex-col gap-2 relative">
            <div className="h-16 w-16 flex justify-center items-center bg-[#133E29] rounded-lg">
              <span className="text-3xl font-semibold text-[#7BC19F]">
                {countDownTime?.minutes}
              </span>
            </div>
            <span className="text-[#133E29] text-xs text-center capitalize">
              {countDownTime?.minutes === '01' ? 'Minuto' : 'Minutos'}
            </span>
          </div>
          <div className="flex flex-col gap-2 relative">
            <div className="h-16 w-16 flex justify-center items-center bg-[#133E29] rounded-lg">
              <span className="text-3xl font-semibold text-[#7BC19F]">
                {countDownTime?.seconds}
              </span>
            </div>
            <span className="text-[#133E29] text-xs text-center capitalize">
              {countDownTime?.seconds === '01' ? 'Segundo' : 'Segundos'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer3;
