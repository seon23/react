import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useSession } from '../hooks/session-context';
import { FormEvent, useRef, useState } from 'react';

export type OutletContext = {
  // item: Cart;
  currItem: Cart;
  saveCartItem: (id: number, name: string, price: number) => void;
  removeCartItem: (id: number) => void;
};

export const ItemLayout = () => {
  const {
    session: { cart },
    removeCartItem,
    saveCartItem,
  } = useSession();

  // const [searchStr, setSearchStr] = useState('');
  const [searchParams, setSearchParams] = useSearchParams({ searchStr: '' });

  // Link to 대신 Outlet에 currItem 전달하는 방식으로 작성하기.
  const [currItem, setCurrItem] = useState<Cart | null>(null);
  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const navToItem = (item: Cart) => {
    setCurrItem(item);
    navigate(`/items/${item.id}`);
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Math.max(...cart.map((cart) => cart.id), 0) + 1;
    const name = itemNameRef.current?.value || '';
    const price = itemPriceRef.current?.value || 0;
    saveCartItem(id, name, Number(price));
  };
  return (
    <>
      Search:{' '}
      <input
        type='text'
        value={searchParams.get('searchStr') || ''}
        onChange={(e) => setSearchParams({ searchStr: e.currentTarget.value })}
      />
      <h2>ITEMS</h2>
      <ul>
        {cart
          .filter((item) =>
            item.name.includes(searchParams.get('searchStr') || '')
          )
          .map((item) => (
            <>
              <li key={item.id}>
                <small>{item.id}</small>{' '}
                <button onClick={() => navToItem(item)}>
                  <strong>{item.name}</strong>
                </button>
                <small>({item.price.toLocaleString()}원)</small>
              </li>
            </>
          ))}
      </ul>
      <form onSubmit={(e) => submit(e)}>
        <input type='text' ref={itemNameRef} />
        <input type='number' ref={itemPriceRef} />
        <button type='submit'>Save</button>
      </form>
      <div style={{ border: '2px solid green', padding: '2rem' }}>
        {/* <Outlet context={{ item: currItem, saveCartItem }} /> */}
        <Outlet context={{ currItem, saveCartItem, removeCartItem }} />
      </div>
    </>
  );
};
