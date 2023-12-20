import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useSession } from '../hooks/session-context';
import { useEffect, useState } from 'react';

// type SearchParam = {
//   aaa: string;
// };

export const Item = () => {
  const {
    session: { cart },
  } = useSession();

  const { id } = useParams();

  const location = useLocation();
  const { state: itemState } = location;

  // item을 상태로 지정한 이유는, useEffect에서 쓰기 위함이다.
  const [item, setItem] = useState<Cart | undefined>(undefined);

  const navigate = useNavigate();
  useEffect(() => {
    console.log('********', item);
    const _item = itemState || cart.find((item) => item.id === Number(id));
    if (!_item) navigate('/items');
    setItem(_item);
  }, [item, navigate, cart, id, itemState]);

  // const { name, price } = item;

  const [searchParams, setSearchParams] = useSearchParams({ aaa: 'x' });
  console.log('🚀 ~ Item ~ aaa:', searchParams.get('aaa'));

  //   const item = cart.find((item) => item.id === Number(id));

  return (
    <>
      {item?.id}. {item?.name} ({item?.price.toLocaleString()}원)
      <button onClick={() => setSearchParams()}></button>
    </>
  );
};
