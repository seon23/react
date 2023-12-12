import { useState } from 'react';
const Counter = () => {
  const [count, setCount] = useState(0);
  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (!count) return;
    setCount(count - 1);
  };

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => incrementCount()}>+1</button>
      <button onClick={() => decrementCount()}>-1</button>
    </>
  );
};

export default Counter;
