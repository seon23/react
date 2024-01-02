import { useOutletContext, useSearchParams } from 'react-router-dom';
import { FormEvent, useReducer, useRef, useState } from 'react';

export const Item = () => {
  const { currItem, saveCartItem, removeCartItem } = useOutletContext<{
    currItem: Cart;
    saveCartItem: SaveCartItem;
    removeCartItem: removeCartItem;
  }>();

  const itemIdRef = useRef<number>(0);
  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);

  // const [isEditing, setEditing] = useState(false);
  const [isEditing, toggleEditing] = useReducer((ie) => !ie, false);
  const [hasDirty, setDirty] = useState(false);

  const [, setSearchParams] = useSearchParams({ searchStr: '', itemId: '' });

  const checkDirty = () => {
    // const id = itemIdRef.current;
    const name = itemNameRef.current?.value;
    const price = Number(itemPriceRef.current?.value);

    setDirty(name !== currItem.name || price !== currItem.price);
  };

  const setCartItem = (id: number) => {
    itemNameRef.current?.focus();
    itemIdRef.current = id;

    if (itemNameRef.current && itemPriceRef.current) {
      itemNameRef.current.value = currItem.name;
      itemPriceRef.current.value = currItem.price.toString();
      setSearchParams({ searchStr: itemNameRef.current.value });
    }
    toggleEditing();
  };

  // useEffect(() => {
  //   if (itemNameRef.current && itemPriceRef.current) {
  //     itemNameRef.current.value = currItem.name;
  //     itemPriceRef.current.value = String(currItem.price);
  //     itemNameRef.current.select();
  //   }
  // }, [currItem, isEditing]);

  // const handleRemove = () => {

  // }

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
    setDirty(!hasDirty);
    toggleEditing();
  };

  return currItem ? (
    <>
      <div>
        {currItem?.id}. {currItem?.name} ({currItem?.price.toLocaleString()}
        원)
      </div>
      {!isEditing && (
        <button onClick={() => setCartItem(currItem.id)}>Edit</button>
      )}
      <button onClick={() => removeCartItem(currItem.id)}>X</button>

      {isEditing && (
        <form onSubmit={submit}>
          <input type='text' ref={itemNameRef} onChange={checkDirty} />
          <input type='number' ref={itemPriceRef} onChange={checkDirty} />

          {hasDirty && <button type='submit'>Save</button>}

          <button onClick={toggleEditing}>Cancle</button>
        </form>
      )}
    </>
  ) : (
    <h2>목록에서 아이템을 선택하세요.</h2>
  );
};
