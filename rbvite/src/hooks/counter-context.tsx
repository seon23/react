import { PropsWithChildren, createContext, useContext, useState } from 'react';

type CounterContextProps = {
  count: number;
  plusCount: () => void;
};

const CounterContext = createContext<CounterContextProps>({
  count: 0,
  plusCount: () => {},
});

export const CounterContextProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);

  const plusCount = () => {
    setCount((count) => count + 1);
  };

  return (
    <CounterContext.Provider value={{ count, plusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCounter = () => useContext(CounterContext);
