import { PropsWithChildren } from 'react';
import { memo } from 'react';

type Props = {
  title: string;
  color: string;
};

const Title = ({ title, color, children }: PropsWithChildren<Props>) => {
  console.log('render Title');
  return (
    <>
      {/* <h1 style={{ color: 'red' }}>{title}</h1> */}
      <h1 style={{ color }}>{title}</h1>
      <h2>{children}</h2>
    </>
  );
};

export default memo(Title);
// Usage

// 1.부모 컴포넌트의 리렌더링과 관계없이 props가 변경되었을 때만 리렌더링!
// const SomeComponent = ({ name, age }) => { . . . };

// export default memo(SomeComponent);

// 2.props 중 name이 변경되었을 때만 리렌더링!
// const SomeComponent = ({ name, age }) => { . . . };
// export default memo(SomeComponent,
//   ({ name: prevName }, { name: currName }) =>
//      prevName === currName

// 3.항상 캐시된 컴포넌트 사용(리렌더링X)
//   const SomeComponent = ({ name, age }) => {
//   . . .
// };
// export default memo(SomeComponent,
//   () => true
// );
