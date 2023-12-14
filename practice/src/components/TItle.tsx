import { PropsWithChildren } from 'react';
import { memo } from 'react';
type Props = {
  title: string;
  color: string;
};

// const Title = ({ title, color, children }: PropsWithChildren<Props>) => {
//   console.log('render Title');
//   return (
//     <>
//       <h1 style={{ color }}>{title}</h1>
//       <h2>{children}</h2>
//     </>
//   );
// };

const Title = memo(function Title({
  title,
  color,
  children,
}: PropsWithChildren<Props>) {
  console.log('render Title');
  return (
    <>
      <h1 style={{ color }}>{title}</h1>
      <h2>{children}</h2>
    </>
  );
});

export default Title;
