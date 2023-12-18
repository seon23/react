import Profile from './Profile';
import { useSession } from '../hooks/session-context';
import './My.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const My = () => {
  // console.log('Render My!');

  const {
    session: { loginUser },
  } = useSession();

  const navigate = useNavigate();
  // if (!loginUser) navigate('/login');
  useEffect(() => {
    if (!loginUser) navigate('/login');
  }, [navigate, loginUser]);

  // My에서는 profile만 보여줄 건데, 문제는 logout되어 있을 때는 profile이 아닌 login
  // login페이지에서는 로그인 되어 있다면 my로 보내야한다.
  return (
    <>
      {/* <div className={clsx({ 'green-border': !loginUser })}>
        {loginUser ? <Profile /> : <Login />}
      </div> */}
      <Profile />
    </>
  );
};

export default My;
