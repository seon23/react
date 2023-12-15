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

  // const { count, incrementCount, decrementCount } = useCounter();
  const { count, decrementCount } = useCounter();
  const childRef = useRef<ChildHandler>(null);

  const fn = useCallback(() => 'FN!', []);
  const age = useMemo(() => count + 1, []);

  return (
    <>
      {/* 부모인 App에서 childRef를 통해 ChildComponent에 접근 가능! */}
      <ChildComponent ref={childRef} />
      <hr />
      <button onClick={() => childRef.current?.appendPeriod()}>
        Call Child Component
      </button>
      <MemoHello age={age} fn={fn} />
      <hr />
      <My
      // loginHandleRef={loginHandleRef}
      />
      <h2>Count: {count}</h2>
      <button onClick={decrementCount}>Decrement</button>
    </>
  );
}

export default App;
