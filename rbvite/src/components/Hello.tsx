import { memo, useEffect, useId, useReducer } from 'react';

type Props = {
  name?: string;
  age: number;
  // plusCount: () => void;
  // children: React.ReactNode;
  // children: React.ReactElement;
  fn: () => void;
};

const Hello = ({ age, fn }: Props) => {
  console.log('Hello.age>>', age);

  const helloId = useId();
  const [isActive, toggleActive] = useReducer((preActive) => !preActive, false);

  useEffect(() => {
    console.log('chld.fn>>>, age, fn()');
  }, [age, fn]);

  return (
    <div style={{ border: '2px solid red' }}>
      <h5 id={helloId}>Hello, ({age}세)</h5>
      {isActive ? 'Active' : 'Passive'}
      <button onClick={toggleActive}>+count</button>
    </div>
  );
};

// Hello.defaultProps = { name: 'Choi' };

// export default Hello;
export const MemoHello = memo(Hello, ({ age }, { age: age2 }) => {
  console.log('preProp>>', age, age2);
  return age === age2;
});
