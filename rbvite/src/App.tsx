import { useState } from 'react';
import './App.css';
import Hello from './components/Hello';
import My from './components/My';

export type LoginUser = { id: number; name: string };
export type Cart = { id: number; name: string; price: number };
export type Session = {
  loginUser: LoginUser | null;
  cart: Cart[];
};

const SampleSession = {
  // loginUser: null,
  loginUser: { id: 1, name: 'Hong' },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

function App() {
  console.log('Render App!');

  const [count, setCount] = useState(0);
  const [session, setSession] = useState<Session>(SampleSession);

  const incrementCount = () => setCount(count + 1);
  const login = ({ id, name }: LoginUser) => {
    if (!name) alert('Input name, please!');
    setSession({ ...session, loginUser: { id, name } });
  };
  const logout = () => {
    setSession({ ...session, loginUser: null });
  };

  return (
    <>
      <Hello name='Kim' age={20} incrementCount={incrementCount}>
        환영합니다!
      </Hello>
      <hr />
      <My session={session} login={login} logout={logout} />
      <h2>Count: {count}</h2>
    </>
  );
}

export default App;
