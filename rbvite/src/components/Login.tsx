import { FormEvent, useEffect, useRef } from 'react';
import { useSession } from '../hooks/session-context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    login,
    session: { loginUser },
  } = useSession();

  const navigate = useNavigate();
  useEffect(() => {
    if (loginUser) navigate('/my');
  }, [loginUser, navigate]);

  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = Number(idRef.current?.value);
    const name = nameRef.current?.value || '';

    // 일단 id = 0도 안 되는 걸로.
    if (!id) {
      alert('아이디를 입력하세요!');
      return focusId();
    }

    if (!name) {
      alert('이름을 입력하세요!');
      return focusName();
    }
    login({ id, name });
  };

  const focusId = () => {
    // idRef.current.focus();
    if (idRef.current) idRef.current.focus();
  };
  const focusName = () => {
    if (nameRef.current) nameRef.current.focus();
  };

  useEffect(() => {
    focusId();
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
};

export default Login;
