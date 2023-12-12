import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const h1Style = { backgroundColor: 'grey', color: 'white' };
  const Title = ({ txt }: { txt: string }) => <h1 style={h1Style}>{txt}</h1>;

  return (
    <>
      {/* <Hello name='Kim' age={20}>
        <h3>Children of Hello</h3>
      </Hello> */}

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
