import { useEffect } from 'react';

export const useTimer = () => {
  // any[]와 unknown[]의 차이
  const useInterval = <T extends unknown[]>(
    cb: (...args: T) => void,
    delay: number
  ) => {
    useEffect(() => {
      const timer = setInterval(cb, delay);

      return () => clearInterval(timer);
    }, []);
  };

  return { useInterval };
};
