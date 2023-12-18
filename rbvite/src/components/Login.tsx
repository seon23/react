import {
  FormEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { useSession } from '../hooks/session-context';
import { useCounter } from '../hooks/counter-context';
import { useNavigate } from 'react-router-dom';

export type LoginHandle = {
  focusName: () => void;
};

const Login = forwardRef((_, handleRef) => {
  // console.log('Render Login!');

  const {
    login,
    session: { loginUser },
  } = useSession();
  const { incrementCount, decrementCount } = useCounter();

  const navigate = useNavigate();
  useEffect(() => {
    if (loginUser) navigate('/my');
  }, [loginUser, navigate]);

  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    incrementCount();
    // console.log('Login Please...', count);

    return () => {
      decrementCount();
      // console.log('login-cleanup-code!!', count);
    };
    //     'react-hooks/exhaustive-deps': 'warn', 때문에 발생하는 오류 해결하려면 아래 방법 말고도
    // (1) useReducer toggleActive 부분 참고
    // (2) useCallback((setCount(preCount => preCount + 1), [])
    // --> setCount가 상태 count를 직접적으로 참조?하고 있지 않으므로 배열 비워놔도 괜찮다.
  }, [incrementCount, decrementCount]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    // action 기능 차단?
    e.preventDefault();
    const id = Number(idRef.current?.value);
    const name = nameRef.current?.value || '';
    login({ id, name });
  };

  const focusName = () => {
    if (nameRef.current) nameRef.current.focus();
  };

  useImperativeHandle(handleRef, () => ({
    focusName,
  }));

  useEffect(() => {
    if (idRef.current) idRef.current.value = '100';
    focusName();
  }, []);

  return (
    <>
      <form onSubmit={submit}>
        <div>
          Login ID(숫자): <input type='number' ref={idRef} />
        </div>
        <div>
          Login Name: <input type='text' ref={nameRef} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  );
});

export default Login;
