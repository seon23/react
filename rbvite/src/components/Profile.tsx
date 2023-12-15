import { useSession } from '../hooks/session-context';

const Profile = () => {
  // console.log('Render Profile!');
  const {
    logout,
    session: { loginUser },
  } = useSession();
  return (
    <>
      <div>User Name: {loginUser?.name}</div>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Profile;
