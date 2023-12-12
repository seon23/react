import { useState } from 'react';
import './App.css';
import Box from './components/Box';
import Counter from './components/Counter';
import Title from './components/TItle';

function App() {
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
      <Box
        borderWidth='2px'
        borderColor='blue'
        borderStyle='solid'
        padding='4px'
        margin='2px'
      >
        <Title title='React Tutorial' color='red'>
          sub title: react basic
        </Title>
        <h1>Count: {count}</h1>
        <Counter
          incrementCount={incrementCount}
          decrementCount={decrementCount}
        />
      </Box>
    </>
  );
}

export default App;
