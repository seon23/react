import { Link, Outlet } from 'react-router-dom';
import { useSession } from '../hooks/session-context';

export const ItemLayout = () => {
  const {
    session: { cart },
    // removeCartItem,
    // saveCartItem,
  } = useSession();
  return (
    <>
      <h2>ITEMS</h2>
      <ul>
        {cart.map(({ id, name, price }: Cart) => (
          <>
            <li key={id}>
              <Link to={`/items/${id}`} state={{ name, price }}>
                <strong>{name}</strong>
              </Link>
            </li>
          </>
        ))}
      </ul>
      <Outlet />
    </>
  );
};
