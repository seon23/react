import { memo, useEffect, useId, useReducer } from 'react';

type Props = {
  // name: string;
  // age: number;

  age: number;
  fn: () => void;
};

// const Hello = ({ name, age, children }: PropsWithChildren<Props>) => {
export const Hello = ({ age, fn }: Props) => {
  // const { count, incrementCount } = useCounter();
  const helloId = useId();

  const [isActive, toggleActive] = useReducer((preActive) => !preActive, false);

  useEffect(() => {
    console.log('child.fn>>>', age, fn());
  }, [age, fn]);

  return (
    <div style={{ border: '2px solid red' }}>
      <h5 id={helloId}>Hello, {age}</h5>
      {/* <button onClick={incrementCount}>+count</button> */}
      <hr />
      {isActive ? 'Active' : 'Passive'}
      <button onClick={toggleActive}>Toggle</button>
      {/* <Sample /> */}
    </div>
  );
};

// export default Hello;
export const MemoHello = memo(Hello, ({ age }, { age: age2 }) => {
  console.log('🚀  prePorp:', age, age2);
  return age === age2;
});
