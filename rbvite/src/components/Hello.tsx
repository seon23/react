import { PropsWithChildren } from 'react';

type Props = {
  name: string;
  age: number;
};

const Hello = ({ name, age, children }: PropsWithChildren<Props>) => {
  return (
    <>
      <h2>
        Hello, {name} ({age}세)
      </h2>
      <h3>{children}</h3>
    </>
  );
};

export default Hello;
