import { Outlet, useSearchParams } from 'react-router-dom';
import { useSession } from '../hooks/session-context';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export const ItemLayout = () => {
  const {
    session: { cart },
    removeCartItem,
    saveCartItem,
  } = useSession();

  const [searchParams, setSearchParams] = useSearchParams({
    searchStr: '',
    itemId: '',
  });
  const searchStr = searchParams.get('searchStr') || '';
  const itemId = searchParams.get('itemId') || '';

  const [currItem, setCurrItem] = useState<Cart | null>(null);
  const [itemList, setItemList] = useState<Cart[]>([]);

  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);

  const handleNav = (item: Cart) => {
    setCurrItem(item);
    // setSearchParams({ searchStr, itemId: String(item.id) });
    setSearchParams({ itemId: String(item.id) });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const currSearch = e.currentTarget.value;
    setSearchParams({ searchStr: currSearch, itemId });
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Math.max(...cart.map((cart) => cart.id), 0) + 1;
    const name = itemNameRef.current?.value || '';
    const price = Number(itemPriceRef.current?.value) || 0;

    saveCartItem(id, name, price);
  };

  useEffect(() => {
    setCurrItem(null);
  }, []);

  useEffect(() => {
    const sortedCart = cart.sort((a, b) => b.id - a.id);
    setItemList(
      searchStr
        ? sortedCart.filter((item) => item.name.includes(searchStr))
        : sortedCart
    );
  }, [cart, searchStr]);

  useEffect(() => {
    setCurrItem(
      itemId
        ? cart.find((item) => item.id === Number(itemId)) || null
        : itemList[0]
    );
  }, [cart, itemList, itemId]);

  return (
    <div style={{ display: 'grid', grid: 'auto-flow / 1fr 1fr' }}>
      <div style={{ border: '2px black solid' }}>
        Search:{' '}
        <input type='text' placeholder='아이템명' onChange={handleSearch} />
        <h2>ITEMS</h2>
        <ul>
          {itemList?.map((item) => (
            <li key={item.id}>
              <small>{item.id}</small>{' '}
              <button
                onClick={() => handleNav(item)}
                className={clsx({ active: item.id === currItem?.id })}
              >
                <strong>{item.name}</strong>
              </button>
              <small>({item.price.toLocaleString()}원)</small>
            </li>
          ))}
        </ul>
        <form onSubmit={(e) => submit(e)}>
          <input type='text' placeholder='상품명' ref={itemNameRef} />
          <br />
          <input type='number' placeholder='가격' ref={itemPriceRef} />
          <br />
          <button type='submit'>Add</button>
        </form>
      </div>
      <div style={{ border: '2px solid blue', padding: '2rem' }}>
        <Outlet context={{ currItem, saveCartItem, removeCartItem }} />
      </div>
    </div>
  );
};
