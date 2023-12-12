import { PropsWithChildren } from 'react';

type Props = {
  title: string;
};

const Title = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <>
      <h1>{title}</h1>
      <h2>{children}</h2>
    </>
  );
};

export default Title;
