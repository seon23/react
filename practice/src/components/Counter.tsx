type Props = {
  incrementCount: () => void;
  decrementCount: () => void;
};

const Counter = ({ incrementCount, decrementCount }: Props) => {
  return (
    <>
      <button onClick={incrementCount}>+1</button>
      <button onClick={decrementCount}>-1</button>
    </>
  );
};

export default Counter;
