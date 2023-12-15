import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import './App.css';
import Hello from './components/Hello';
import My from './components/My';
import { useCounter } from './hooks/counter-context';
import { useTimer } from './hooks/timer-hooks';

type ChildHandler = {
  appendPeriod: () => void;
};

// 여기서 ref는 ChildComponent의 ref 어트리뷰트?
const ChildComponent = forwardRef((_, ref) => {
  const [childText, setChildText] = useState('.');
  const [badCount, setBadCount] = useState(0);
  const [goodCount, setGoodCount] = useState(0);

  const { useInterval } = useTimer();

  useInterval(() => setBadCount((pre) => pre + 1), 1000);

  useEffect(() => {
    const intl = setInterval(() => setGoodCount((pre) => pre + 1), 1000);

    return () => clearInterval(intl);
  }, []);

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

  const { count } = useCounter();
  const childRef = useRef<ChildHandler>(null);

  return (
    <>
      {/* 부모인 App에서 childRef를 통해 ChildComponent에 접근 가능! */}
      <ChildComponent ref={childRef} />
      <hr />
      <button onClick={() => childRef.current?.appendPeriod()}>
        Call Child Component
      </button>
      <Hello name='Kim' age={20}>
        환영합니다!
      </Hello>
      <hr />
      <My
      // loginHandleRef={loginHandleRef}
      />
      <h2>Count: {count}</h2>
    </>
  );
}

export default App;
