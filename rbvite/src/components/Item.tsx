import {
  // useLocation,
  // useNavigate,
  useOutletContext,
  // useParams,
} from 'react-router-dom';
// import { useSession } from '../hooks/session-context';
// import { useEffect, useState } from 'react';
import { OutletContext } from './ItemLayout';

// type SearchParam = {
//   aaa: string;
// };

export const Item = () => {
  // const {
  //   session: { cart },
  // } = useSession();

  // const { currItem, saveCartItem } = useOutletContext<OutletContext>();
  const { currItem } = useOutletContext<OutletContext>();

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

  return (
    <>
      {/* {item?.id}. {item?.name} ({item?.price.toLocaleString()}원) currItem &&{' '} */}
      {currItem?.id}. {currItem?.name} ({currItem?.price.toLocaleString()}원)
      <button>Edit</button>
    </>
  );
};
