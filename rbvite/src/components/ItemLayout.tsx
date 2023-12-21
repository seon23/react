import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useSession } from '../hooks/session-context';
import { useState } from 'react';

export type OutletContext = {
  // item: Cart;
  currItem: Cart;
  saveCartItem: (id: number, name: string, price: number) => void;
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

  const navigate = useNavigate();
  const navToItem = (item: Cart) => {
    setCurrItem(item);
    navigate(`/items/${item.id}`);
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
                {/* <Link to={`/items/${item.id}`} state={item}>
                  <strong>{item.name}</strong>
                </Link> */}
                <button onClick={() => navToItem(item)}>
                  <strong>{item.name}</strong>
                </button>
                <small>({item.price.toLocaleString()}원)</small>
                <button onClick={() => removeCartItem(item.id)}>X</button>
              </li>
            </>
          ))}
        {/* 여기에 추가버튼 만들면 Item.tsx가 추가 input form을 보여줘야하는 건데 */}
      </ul>
      <div style={{ border: '2px solid green', padding: '2rem' }}>
        {/* <Outlet context={{ item: currItem, saveCartItem }} /> */}
        <Outlet context={{ currItem, saveCartItem, removeCartItem }} />
      </div>
    </>
  );
};
