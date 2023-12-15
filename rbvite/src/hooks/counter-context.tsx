import {
  //   Dispatch,
  PropsWithChildren,
  //   SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type CounterContextProps = {
  count: number;
  //   setCount: Dispatch<SetStateAction<number>>;
  incrementCount: () => void;
};
const CounterContext = createContext<CounterContextProps>({
  count: 0,
  incrementCount: () => {},
});

const CounterContextProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => setCount(count + 1);
  return (
    <CounterContext.Provider value={{ count, incrementCount }}>
      {children}
    </CounterContext.Provider>
  );
};
const useCounter = () => useContext(CounterContext);

// eslint-disable-next-line react-refresh/only-export-components
export { CounterContextProvider, useCounter };
