import { Cart, Session, LoginUser } from '../App';
import Profile from './Profile';
import Login from './Login';

type Props = {
  session: Session;
  login: ({ id, name }: LoginUser) => void;
  logout: () => void;
  removeCartItem: (itemId: number) => void;
};

// const My = ({session, login, logout}: Props) => {
const My = ({
  session: { loginUser, cart },
  login,
  logout,
  removeCartItem,
}: Props) => {
  console.log('Render My!');

  return (
    <>
      {/* 1. 로그인 폼 또는 프로필 */}
      {loginUser ? (
        <Profile loginUser={loginUser} logout={logout} />
      ) : (
        <Login login={login} />
      )}
      <hr />
      {/* 2. 아이템 목록 */}
      <ul>
        {cart.map(({ id, name, price }: Cart) => (
          <>
            <li key={id}>
              {name}({price.toLocaleString()}원)
            </li>
            <button onClick={() => removeCartItem(id)}>X</button>
          </>
        ))}
      </ul>
    </>
  );
};

export default My;
