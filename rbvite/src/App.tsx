import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import './App.css';
import My from './components/My';
import { useCounter } from './hooks/counter-context';
import { useTimer } from './hooks/timer-hooks';
import { MemoHello } from './components/Hello';
import { SessionContextProvider } from './hooks/session-context';

type ChildHandler = {
  appendPeriod: () => void;
};

// 여기서 ref는 ChildComponent의 ref 어트리뷰트?
const ChildComponent = forwardRef((_, ref) => {
  const [childText, setChildText] = useState('.');
  const [badCount, setBadCount] = useState(0);
  const [goodCount, setGoodCount] = useState(0);

  const { useInterval, useTimeout } = useTimer();

  useInterval(() => setBadCount((pre) => pre + 1), 1000);
  useInterval(() => setGoodCount((pre) => pre + 1), 1000);

  // useEffect(() => {
  //   const intl = setInterval(() => setGoodCount((pre) => pre + 1), 1000);

  //   return () => clearInterval(intl);
  // }, []);

  useTimeout(
    (initSec) => {
      setBadCount(initSec);
      setGoodCount(initSec);
    },
    5000,
    100
  );

  const handler: ChildHandler = {
    // setChildText에서 이전 값 c가 필요한 이유는?
    appendPeriod: () => setChildText((c) => c + '.'),
  };
  // ref, 즉 부모에서 생성한 ref object(ChildComponent를 참조하는)의 current prop에 handler 연결?
  useImperativeHandle(ref, () => handler);
  return (
    <>
      <strong style={{ float: 'left', color: 'red' }}>{badCount}</strong>
      childComp: {childText}
      <strong style={{ float: 'right', color: 'green' }}>{goodCount}</strong>
    </>
  );
});

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
<<<<<<< HEAD
<<<<<<< HEAD
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

  const fn = useCallback(() => 'FN!', []);
  const age = useMemo(() => count + 1, []);
=======
>>>>>>> parent of b8538a6 (Add function removeCartItem to App.tsx)
=======
>>>>>>> parent of b8538a6 (Add function removeCartItem to App.tsx)

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
<<<<<<< HEAD
<<<<<<< HEAD
      <My
        session={session}
        login={login}
        logout={logout}
        saveCartItem={saveCartItem}
        removeCartItem={removeCartItem}
      />
=======
      <My session={session} login={login} logout={logout} />
>>>>>>> parent of b8538a6 (Add function removeCartItem to App.tsx)
=======
      <My session={session} login={login} logout={logout} />
>>>>>>> parent of b8538a6 (Add function removeCartItem to App.tsx)
      <h2>Count: {count}</h2>
    </>
  );
}

export default App;
