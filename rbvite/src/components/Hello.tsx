import { PropsWithChildren } from 'react';

type Props = {
  name: string;
  age: number;
  incrementCount: () => void;
};

const Hello = ({
  name,
  age,
  incrementCount,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <>
      <h2>
        Hello, {name} ({age}세)
      </h2>
      <h3>{children}</h3>
      <button onClick={incrementCount}>count + 1</button>
    </>
  );
};

export default Hello;
