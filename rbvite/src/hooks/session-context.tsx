// 일단 useReducer 전까지

import { createContext, useContext, useState } from 'react';

type Props = {
  session: Session;
  login: () => void;
  logout: () => void;
  saveCartItem: () => void;
  removeCartItem: () => void;
};

const DEFAULT_SESSION = {
  loginUser: null,
  cart: [],
};

const SessionContext = createContext<Props>({
  session: DEFAULT_SESSION,
  login: () => {},
  logout: () => {},
  saveCartItem: () => {},
  removeCartItem: () => {},
});

const SessionContextProvider = () => {
  const [session, setSession] = useState<Session>(null);
  const login = ({ id, name }: LoginUser) => {};
  const logout = () => {
    setSession;
  };
  return (
    <SessionContext.Provider
      value={{ session, login, logout, saveCartItem, removeCartItem }}
    ></SessionContext.Provider>
  );
};

const useSession = useContext(SessionContext);

// eslint-disable-next-line react-refresh/only-export-components
export { SessionContextProvider, useSession };
