import { useState, useRef } from 'react';
import './App.css';
import Box from './components/Box';
import Counter from './components/Counter';
import Title from './components/Title';

function App() {
  const [count, setCount] = useState(0);
  const [subTitle, setSubTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (!count) return;
    setCount(count - 1);
  };

  // const changeSubTitle = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSubTitle(e.currentTarget.value);
  // };
  const changeSubTitle = () => {
    setSubTitle(inputRef.current?.value || '');
  };

  return (
    <>
      <Box
        borderWidth='2px'
        borderColor='blue'
        borderStyle='solid'
        padding='4px'
        margin='2px'
      >
        <Title title='React Tutorial' color='red'>
          sub title: {subTitle}
        </Title>
        <h1>Count: {count}</h1>
        <Counter
          incrementCount={incrementCount}
          decrementCount={decrementCount}
        />
        <div>
          <input type='text' value={subTitle} onChange={changeSubTitle} />
          <input type='text' ref={inputRef} />
          <button onClick={changeSubTitle}>입력</button>
        </div>
      </Box>
    </>
  );
}

export default App;
