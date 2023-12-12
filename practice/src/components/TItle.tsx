import { PropsWithChildren } from 'react';

type Props = {
  title: string;
  color: string;
};

const Title = ({ title, color, children }: PropsWithChildren<Props>) => {
  return (
    <>
      {/* <h1 style={{ color: 'red' }}>{title}</h1> */}
      <h1 style={{ color }}>{title}</h1>
      <h2>{children}</h2>
    </>
  );
};

export default Title;
