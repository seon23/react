import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/' replace>
            Home
          </Link>
        </li>
        <li>
          {/* NavLink 구현 */}
          <NavLink
            to='/test'
            style={({ isActive }) => (isActive ? { color: 'red' } : {})}
          >
            Test
          </NavLink>
        </li>

        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/my'>My</Link>
        </li>
        <li>
          <Link to='/items'>Items</Link>
        </li>
        <li>
          <Link to='/hello'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

// export const NavLink = ({ style, classNames: Prop }) => {
//   ...

// useEffect(() => {
//   if (typeof className ==== 'fn') {
//   classNames({ isActive: to === location.pathname })
//       })
//     }
//   })
// }

// <NavLink
//   to='/my'
//   style={({ isActive }) => (isActive ? { color: 'red' } : {})}
// >
//   My
// </NavLink>;
