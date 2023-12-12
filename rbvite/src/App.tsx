import { useState } from 'react';
import './App.css';
import Hello from './components/Hello';

function App() {
  const [count, setCount] = useState(0);

  const h1Style = { backgroundColor: 'grey', color: 'white' };
  const Title = ({ txt }: { txt: string }) => <h1 style={h1Style}>{txt}</h1>;

  return (
    <>
      <Hello name='Kim' age={20}>
        <strong>Children of Component Hello</strong>
      </Hello>
      {count && <Title txt={`Vite + React ${count}`} />}
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count > 0 ? 'Big' : 'Zero'}
        </button>
        <p>Count: {count && 'Non-Zero'}</p>
        <input type='text' />
      </div>
    </>
  );
}

export default App;
