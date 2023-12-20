import { FormEvent, useRef } from 'react';
import { LoginUser } from '../App';

type Props = {
  login: ({ id, name }: LoginUser) => void;
};

const Login = ({ login }: Props) => {
  // const [id, setId] = useState(0);
  // const [name, setName] = useState('');
  const useIdRef = useRef<HTMLInputElement>(null);
  const useNameRef = useRef<HTMLInputElement>(null);

  console.log('@@@Login');

  const submit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const id = Number(useIdRef.current?.value);
    const name = useNameRef.current?.value || '';
    login({ id, name });
  };

  return (
    <>
      <form onSubmit={submit}>
        <div>
          Login ID(숫자):
          <input type='number' ref={useIdRef} />
        </div>
        <div>
          Login Name: <input type='text' ref={useNameRef} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  );
};
export default Login;
