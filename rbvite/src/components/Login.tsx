import {
  FormEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { useSession } from '../hooks/session-context';
import { useCounter } from '../hooks/counter-context';

export type LoginHandle = {
  focusName: () => void;
};

const Login = forwardRef((_, handleRef) => {
  console.log('Render Login!');

  const { login } = useSession();
  const { incrementCount, decrementCount } = useCounter();
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    incrementCount();
    // console.log('Login Please...', count);

    return () => {
      decrementCount();
      // console.log('login-cleanup-code!!', count);
    };
  }, []);

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
