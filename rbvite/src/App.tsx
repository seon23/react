import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
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

type ChildHandler = {
  appendPeriod: () => void;
};

// 여기서 ref는 ChildComponent의 ref 어트리뷰트?
const ChildComponent = forwardRef((_, ref) => {
  const [childText, setChildText] = useState('.');

  const handler: ChildHandler = {
    // setChildText에서 이전 값 c가 필요한 이유는?
    appendPeriod: () => setChildText((c) => c + '.'),
  };
  // ref, 즉 부모에서 생성한 ref object(ChildComponent를 참조하는)의 current prop에 handler 연결?
  useImperativeHandle(ref, () => handler);
  return <>childComp: {childText}</>;
});

function App() {
  console.log('Render App!');

  const [count, setCount] = useState(0);
  const [session, setSession] = useState<Session>(SampleSession);

  const incrementCount = () => setCount(count + 1);
  const login = ({ id, name }: LoginUser) => {
    if (!name) return alert('Input name, please!');
    setSession({ ...session, loginUser: { id, name } });
  };
  const logout = () => {
    setSession({ ...session, loginUser: null });
  };
  const removeCartItem = (itemId: number) => {
    setSession({
      ...session,
      cart: session.cart.filter((item) => item.id !== itemId),
    });
  };
  const saveCartItem = (name: string, price: number) => {
    const id =
      session.cart
        .map((cart) => cart.id)
        .sort()
        .at(-1) || 0;
    setSession({
      ...session,
      cart: [...session.cart, { id: id + 1, name, price }],
    });
  };
  const childRef = useRef<ChildHandler>(null);
  return (
    <>
      {/* 부모인 App에서 childRef를 통해 ChildComponent에 접근 가능! */}
      <ChildComponent ref={childRef} />
      <hr />
      <button onClick={() => childRef.current?.appendPeriod()}>
        Call Child Component
      </button>
      <Hello name='Kim' age={20} incrementCount={incrementCount}>
        환영합니다!
      </Hello>
      <hr />
      <My
        session={session}
        login={login}
        logout={logout}
        saveCartItem={saveCartItem}
        removeCartItem={removeCartItem}
      />
      <h2>Count: {count}</h2>
    </>
  );
}

export default App;
