import { PropsWithChildren } from 'react';

type Props = {
  borderWidth: string;
  borderColor: string;
  borderStyle: string;
  padding: string;
  margin: string;
};

const Box = ({
  borderWidth,
  borderColor,
  borderStyle,
  padding,
  margin,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div style={{ borderWidth, borderColor, borderStyle, padding, margin }}>
      {children}
    </div>
  );
};

export default Box;
