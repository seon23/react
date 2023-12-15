import { PropsWithChildren } from 'react';
import { useCounter } from '../hooks/counter-context';

type Props = {
  name: string;
  age: number;
};

const Hello = ({ name, age, children }: PropsWithChildren<Props>) => {
  const { count, incrementCount } = useCounter();
  return (
    <>
      <h2>
        Hello, {name} ({age}세) [{count}]
      </h2>
      <h3>{children}</h3>
      <button onClick={incrementCount}>count + 1</button>
    </>
  );
};

export default Hello;
