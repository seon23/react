import {
  forwardRef,
  useCallback,
  useEffect,
  // useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import './App.css';
import { MemoHello } from './components/Hello';
import My from './components/My';
import { useCounter } from './hooks/counter-context';
import { SessionContextProvider } from './hooks/session-context';
import { useTimer } from './hooks/timer-hooks';

type ChildHandler = {
  appendPeriod: () => void;
};
const ChildComponent = forwardRef((_, ref) => {
  const [childText, setChildText] = useState('.');

  const handler: ChildHandler = {
    appendPeriod: () => setChildText((c) => c + '.'),
  };
  useImperativeHandle(ref, () => handler);
  return <>childComp: {childText}</>;
});

function App() {
  const { count } = useCounter();
  const [badCount, setBadCount] = useState(0);
  const [goodCount, setGoodCount] = useState(0);

  const { useInterval } = useTimer();

  useEffect(() => {
    setInterval(() => setBadCount((pre) => pre + 1), 1000);

    // return () => clearInterval(intl);
  }, []);
  useInterval(() => setGoodCount((pre) => pre + 1), 1000);

  const childRef = useRef<ChildHandler>(null);

  const helloFn = useCallback(() => 'FN in Hello!', []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const helloAge = useMemo(() => count + 1, []);

  return (
    <>
      <strong style={{ float: 'left', color: 'red' }}>{badCount}</strong>
      <strong style={{ float: 'right', color: 'blue' }}>{goodCount}</strong>
      <ChildComponent ref={childRef} />
      <hr />
      <button onClick={() => childRef.current?.appendPeriod()}>
        Call Child Component
      </button>
      {/* <Hello age={32} /> */}
      <MemoHello age={helloAge} fn={helloFn} />
      <hr />
      <SessionContextProvider>
        <My
        // loginHandleRef={loginHandleRef}
        />
      </SessionContextProvider>
      <div className='card'>Count: {count}</div>
    </>
  );
}

export default App;
