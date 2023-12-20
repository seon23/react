import { PropsWithChildren, createContext, useContext, useState } from 'react';

const DEFAULT_SESSION = {
  loginUser: null,
  cart: [],
};

type SessionContextProps = {
  session: Session;
  login: ({ id, name }: LoginUser) => void;
  logout: () => void;
  // 여기서는 type 안 맞춰주어도 되나?
  saveCartItem: (name: string, price: number) => void;
  removeCartItem: (itemId: number) => void;
};

const SessionContext = createContext<SessionContextProps>({
  session: DEFAULT_SESSION,
  // 여기서는 매개변수 type 안 맞춰주어도 되나?
  login: () => {},
  logout: () => {},
  saveCartItem: () => {},
  removeCartItem: () => {},
});

const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session>(DEFAULT_SESSION);

  // const loginHandleRef = useRef<LoginHandle>(null);

  const login = ({ id, name }: LoginUser) => {
    if (!name) {
      //   alert('Input User Name, please.');
      //   loginHandleRef.current?.focusName();
      //   return;
      return alert('Input User Name, please.');
    }
    setSession({ ...session, loginUser: { id, name } });
  };

  const logout = () => {
    setSession({ ...session, loginUser: null });
  };
  const saveCartItem = (name: string, price: number) => {
    // const id = Math.max(session.cart.map((cart) => cart.id)) + 1 || 0;
    const id =
      (session.cart
        .map((cart) => cart.id)
        .sort()
        .at(-1) || 0) + 1;

    setSession({
      ...session,
      cart: [...session.cart, { id, name, price }],
    });
  };

  const removeCartItem = (itemId: number) => {
    setSession({
      ...session,
      cart: session.cart.filter((item) => item.id !== itemId),
    });
  };

  return (
    <SessionContext.Provider
      value={{ session, login, logout, saveCartItem, removeCartItem }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const useSession = () => useContext(SessionContext);

// eslint-disable-next-line react-refresh/only-export-components
export { SessionContextProvider, useSession };
