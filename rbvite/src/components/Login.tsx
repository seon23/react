import { FormEvent } from 'react';

const Login = () => {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //   login(id, name)
  };
  return (
    <>
      <form onSubmit={submit}>
        ID(숫자): <input type='number' />
        PW: <input type='price' />
        <button type='submit'>로그인</button>
      </form>
    </>
  );
};

export default Login;
