import { useEffect } from 'react';
import { useSession } from '../hooks/session-context';
import { useFetch } from '../hooks/fetch-hook';

const Profile = () => {
  // console.log('Render Profile!');
  const {
    logout,
    session: { loginUser },
  } = useSession();

  const url = '/data/sample.json';
  const data = useFetch<Session>(url);
  useEffect(() => {
    if (data) console.log('🚀  data:', data);
  }, [data]);
  return (
    <>
      <div>User Name: {loginUser?.name}</div>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Profile;
