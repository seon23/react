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
  });
  const searchStr = searchParams.get('searchStr') || '';

  const [currItem, setCurrItem] = useState<Cart | null>(null);
  const [itemList, setItemList] = useState<Cart[]>([]);

  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);

  const navToItem = (item: Cart) => {
    setCurrItem(item);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const currStr = e.currentTarget.value;
    setSearchParams({ searchStr: currStr });
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Math.max(...cart.map((cart) => cart.id), 0) + 1;
    const name = itemNameRef.current?.value || '';
    const price = itemPriceRef.current?.value || 0;
    saveCartItem(id, name, Number(price));
  };

  useEffect(() => {
    const x = cart.sort((a, b) => b.id - a.id);
    // x = searchStr ? x : x.filter((item) => item.name.includes(searchStr));
    setItemList(
      searchStr ? x.filter((item) => item.name.includes(searchStr)) : x
    );
  }, [cart, searchStr]);

  useEffect(() => {
    // const searchedItem = itemList.find((item) => item.name.includes(searchStr));
    // setCurrItem({
    //   id: searchedItem.id,
    //   name: searchStr,
    //   price: searchedItem.price,
    // });
    setCurrItem(itemList[0]);
  }, [itemList]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ border: '2px black solid' }}>
        Search:{' '}
        <input
          type='text'
          value={searchStr}
          placeholder='아이템명'
          onChange={handleSearch}
        />
        <h2>ITEMS</h2>
        <ul>
          {itemList?.map((item) => (
            <li key={item.id}>
              <small>{item.id}</small>{' '}
              <button
                onClick={() => navToItem(item)}
                className={clsx({ active: item.id === currItem?.id })}
              >
                <strong>{item.name}</strong>
              </button>
              <small>({item.price.toLocaleString()}원)</small>
            </li>
          ))}
        </ul>
        <form onSubmit={(e) => submit(e)}>
          <input type='text' placeholder='아이템명' ref={itemNameRef} />
          <input type='number' placeholder='가격' ref={itemPriceRef} />
          <button type='submit'>Save</button>
        </form>
      </div>
      <div style={{ border: '2px solid blue', padding: '2rem' }}>
        <Outlet context={{ currItem, saveCartItem, removeCartItem }} />
      </div>
    </div>
  );
};
