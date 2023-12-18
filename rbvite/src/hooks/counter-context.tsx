import {
  //   Dispatch,
  PropsWithChildren,
  //   SetStateAction,
  createContext,
  useContext,
  useReducer,
} from 'react';

type CounterContextProps = {
  count: number;
  //   setCount: Dispatch<SetStateAction<number>>;
  incrementCount: () => void;
  decrementCount: () => void;
};
const CounterContext = createContext<CounterContextProps>({
  count: 0,
  incrementCount: () => {},
  decrementCount: () => {},
});

type Action = { type: string; payload?: number };
const reducer = (count: number, { type, payload = 1 }: Action) => {
  switch (type) {
    case 'plus':
      return count + payload;
    case 'minus':
      return count - payload;

    default:
      return count;
  }
};

const CounterContextProvider = ({ children }: PropsWithChildren) => {
  const [count, dispatch] = useReducer(reducer, 0);
  // const incrementCount = () => dispach({ type: 'plus', payload: 2 });
  const incrementCount = () => dispatch({ type: 'plus', payload: 1 });
  const decrementCount = () => dispatch({ type: 'minus' });
  return (
    <CounterContext.Provider value={{ count, incrementCount, decrementCount }}>
      {children}
    </CounterContext.Provider>
  );
};
const useCounter = () => useContext(CounterContext);

// eslint-disable-next-line react-refresh/only-export-components
export { CounterContextProvider, useCounter };
