import { useState } from 'react';
import { LoginUser } from '../App';

type Props = {
  login: ({ id, name }: LoginUser) => void;
};

const Login = ({ login }: Props) => {
  console.log('Render Login!');

  const [id, setId] = useState(0);
  const [name, setName] = useState('');

  return (
    <>
      <div>
        Login ID(숫자):{' '}
        <input
          type='number'
          onChange={(e) => setId(Number(e.currentTarget.value))}
        />
      </div>
      <div>
        Login Name:{' '}
        <input type='text' onChange={(e) => setName(e.currentTarget.value)} />
      </div>
      <button onClick={() => login({ id, name })}>Login</button>
    </>
  );
};

export default Login;
