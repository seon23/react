import Profile from './Profile';
// import Login, { LoginHandle } from './Login';
import Login from './Login';
// import { FormEvent, RefObject, useRef } from 'react';
import { FormEvent, useRef } from 'react';
import { useSession } from '../hooks/session-context';

const My = () => {
  console.log('Render My!');

  const {
    session: { loginUser, cart },
    saveCartItem,
    removeCartItem,
  } = useSession();

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
      {loginUser ? <Profile /> : <Login />}
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
