import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to='/'
            replace
            className={({ isActive }) => clsx({ bold: isActive })}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/login'
            className={({ isActive }) => clsx({ bold: isActive })}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/my'
            className={({ isActive }) => clsx({ bold: isActive })}
          >
            My
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/items'
            className={({ isActive }) => clsx({ bold: isActive })}
          >
            Items
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/hello'
            className={({ isActive }) => clsx({ bold: isActive })}
          >
            About
          </NavLink>
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
