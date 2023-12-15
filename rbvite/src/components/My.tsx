import { Cart, Session, LoginUser } from '../App';
import Profile from './Profile';
import Login from './Login';
import { FormEvent, useRef } from 'react';

type Props = {
  session: Session;
  login: ({ id, name }: LoginUser) => void;
  logout: () => void;
  saveCartItem: (name: string, price: number) => void;
  removeCartItem: (itemId: number) => void;
};

// const My = ({session, login, logout}: Props) => {
const My = ({
  session: { loginUser, cart },
  login,
  logout,
  saveCartItem,
  removeCartItem,
}: Props) => {
  console.log('Render My!');

  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = itemNameRef.current?.value;
    const price = itemPriceRef.current?.value;

    if (!name) {
      alert('상품명을 정확히 입력해 주세요!');
      return itemNameRef.current?.focus();
    }
    if (!price) {
      alert('가격을 정확히 입력해 주세요!');
      return itemPriceRef.current?.focus();
    }

    saveCartItem(name, Number(price));
    itemNameRef.current.value = '';
    itemPriceRef.current.value = '';
  };
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
              <button onClick={() => removeCartItem(id)}>X</button>
            </li>
          </>
        ))}
        <form onSubmit={submit}>
          <input type='text' ref={itemNameRef} />
          <input type='number' ref={itemPriceRef} />
          <button type='submit'>Save</button>
        </form>
      </ul>
    </>
  );
};

export default My;
