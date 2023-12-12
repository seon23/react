// import { PropsWithChildren } from 'react';
import { ReactElement } from 'react';

type Props = {
  name: string;
  age: number;
  children: ReactElement;
};

// const Hello = ({ name, age, children }: PropsWithChildren<Props>) => {
const Hello = (prop: Props) => {
  let { name, age, children } = prop;

  // prop.age 변경하면 화면이 아예 그려지지 않는다. (not primitive)
  prop.age = prop.age + 1;
  age = age + 1; // (primitive)

  console.log('Hello.age>>', age);
  console.log('props.age>>', prop.age);

  return (
    <>
      <h2>
        Hello, {name} ({age}세? {prop.age}세?)
      </h2>
      <h3>{children}</h3>
    </>
  );
};

export default Hello;
