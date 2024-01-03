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
      </ul>
    </nav>
  );
};
