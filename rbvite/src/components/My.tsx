import Profile from './Profile';
import Login from './Login';
<<<<<<< HEAD
import { FormEvent, useRef, useState } from 'react';
import { useSession } from '../hooks/session-context';

const My = () => {
  // console.log('Render My!');

  const {
    session: { loginUser, cart },
    saveCartItem,
    removeCartItem,
  } = useSession();

  const itemIdRef = useRef<number>(0);
  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);

  const [hasDirty, setDirty] = useState(false);

  const checkDirty = () => {
    const id = itemIdRef.current;
    const name = itemNameRef.current?.value;
    const price = itemPriceRef.current?.value;

    const selectedItem = !id
      ? { name: '', price: '' }
      : cart.find((item) => item.id === id) || { name: '', price: '' };

    setDirty(name !== selectedItem.name || price != selectedItem.price);
  };
  const setCartItem = (id: number) => {
    itemIdRef.current = id;
    const selectedItem = cart.find((item) => item.id === id) || {
      name: '',
      price: 0,
    };
    if (itemNameRef.current && itemPriceRef.current) {
      itemNameRef.current.value = selectedItem?.name;
      itemPriceRef.current.value = selectedItem?.price.toString();
    }
  };

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

    saveCartItem(itemIdRef.current, name, Number(price));
    itemNameRef.current.value = '';
    itemPriceRef.current.value = '';
    setDirty(false);
  };
=======

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

>>>>>>> parent of a17f1b8 (Add saveCartItem() and input form using useRef.)
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
<<<<<<< HEAD
              <small>{id}</small>{' '}
              <button
                onClick={() => setCartItem(id)}
                style={{
                  paddingTop: 0,
                  paddingBottom: '0.2rem',
                  backgroundColor: 'inherit',
                }}
                title='수정'
              >
                <strong>{name}</strong>
              </button>
              <small>({price.toLocaleString()}원)</small>
              <button onClick={() => removeCartItem(id)}>X</button>
=======
              {name}({price.toLocaleString()}원)
>>>>>>> parent of a17f1b8 (Add saveCartItem() and input form using useRef.)
            </li>
            <button onClick={() => removeCartItem(id)}>X</button>
          </>
        ))}
<<<<<<< HEAD
        <form onSubmit={submit}>
          <input type='text' ref={itemNameRef} onChange={() => checkDirty()} />
          <input
            type='number'
            ref={itemPriceRef}
            onChange={() => checkDirty()}
          />
          {hasDirty && <button type='submit'>Save</button>}
        </form>
=======
>>>>>>> parent of a17f1b8 (Add saveCartItem() and input form using useRef.)
      </ul>
    </>
  );
};

export default My;
