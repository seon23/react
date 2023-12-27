import {
  // useLocation,
  // useNavigate,
  useOutletContext,
  // useParams,
} from 'react-router-dom';
// import { useSession } from '../hooks/session-context';
// import { useEffect, useState } from 'react';
import { OutletContext } from './ItemLayout';
import { FormEvent, useRef, useState } from 'react';

// type SearchParam = {
//   aaa: string;
// };

export const Item = () => {
  // const {
  //   session: { cart },
  // } = useSession();

  // const { currItem, saveCartItem } = useOutletContext<OutletContext>();
  const { currItem, saveCartItem, removeCartItem } =
    useOutletContext<OutletContext>();

  // const { id } = useParams();

  // const location = useLocation();
  // const { state: itemState } = location;

  // item을 상태로 지정한 이유는, useEffect에서 쓰기 위함이다.
  // const [item, setItem] = useState<Cart | undefined>(undefined);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   console.log('********', currItem);
  //   const _item = itemState || cart.find((item) => item.id === Number(id));
  //   if (!_item) navigate('/items');
  //   setItem(_item);
  // }, [currItem, navigate, cart, id, itemState]);

  const itemIdRef = useRef<number>(0);
  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);

  // isEditing의 초깃값을 true로 두는 게 맞나?
  // isEditing을 useState로 관리하는 게 맞나?
  const [isEditing, setEditing] = useState(false);
  const [hasDirty, setDirty] = useState(false);

  const checkDirty = () => {
    // const id = itemIdRef.current;
    const name = itemNameRef.current?.value;
    const price = Number(itemPriceRef.current?.value);

    // const selectedItem = !id
    //   ? { name: '', price: '' }
    //   : cart.find((item) => item.id === id) || { name: '', price: '' };

    setDirty(name !== currItem.name || price !== currItem.price);
  };

  // <2023.12.27>
  // 여기서의 setCartItem은 OutletContext의 currItem을 받았다는 전제 하에 실행되는 건데...
  // update 함수도 session-context에서 만드는 게 맞는 것 같다.
  // (ItemLayout에서 save(add)CartItem 쓰고, Item에서 updateCartItem 쓸 예정)
  const setCartItem = (id: number) => {
    setEditing(!isEditing);
    itemNameRef.current?.focus();
    itemIdRef.current = id;

    // const selectedItem = currItem.find((item) => item.id === id) || {
    //   name: '',
    //   price: 0,
    // };

    if (itemNameRef.current && itemPriceRef.current) {
      // itemNameRef.current.value = currItem?.name;
      // itemPriceRef.current.value = currItem?.price.toString();
      itemNameRef.current.value = currItem.name;
      itemPriceRef.current.value = currItem.price.toString();
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
    setEditing(!isEditing);
    itemNameRef.current.value = '';
    itemPriceRef.current.value = '';
    setDirty(!isEditing);
  };

  const cancleEdit = () => {
    setEditing(!isEditing);
  };
  return (
    <>
      {/* {item?.id}. {item?.name} ({item?.price.toLocaleString()}원) currItem &&{' '} */}
      {currItem?.id}. {currItem?.name} ({currItem?.price.toLocaleString()}원)
      {/* setCartItem 관련 부분 수정 필요 */}
      {isEditing || (
        <button onClick={() => setCartItem(currItem.id)}>Edit</button>
      )}
      <button onClick={() => removeCartItem(currItem.id)}>X</button>
      {isEditing && (
        <>
          <form onSubmit={submit}>
            <input
              type='text'
              ref={itemNameRef}
              onChange={() => checkDirty()}
            />
            <input
              type='number'
              ref={itemPriceRef}
              onChange={() => checkDirty()}
            />
            {hasDirty && <button type='submit'>Save</button>}
            <button onClick={cancleEdit}>Cancle</button>
          </form>
        </>
      )}
    </>
  );
};
