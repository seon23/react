import { useParams, useSearchParams } from 'react-router-dom';
import { useSession } from '../hooks/session-context';

// type SearchParam = {
//   aaa: string;
// };

export const Item = () => {
  const {
    session: { cart },
  } = useSession();

  const { id } = useParams();

  //   const location = useLocation();
  //   const { name, price } = location.state || { name: '0', price: 0 };
  const { name, price } = cart.find((item) => item.id === Number(id)) || {
    name: '0',
    price: 0,
  };

  const [searchParams, setSearchParams] = useSearchParams({ aaa: 'x' });
  console.log('🚀 ~ Item ~ aaa:', searchParams.get('aaa'));

  //   const item = cart.find((item) => item.id === Number(id));

  return (
    <>
      {id}. {name} ({price.toLocaleString()}원)
      <button onClick={() => setSearchParams()}></button>
    </>
  );
};
