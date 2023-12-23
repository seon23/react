import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const DEFAULT_SESSION = {
  loginUser: null,
  cart: [],
};
// const DEFAULT_SESSION = {
//   loginUser: null,
//   cart: [
//     { id: 100, name: '라면1', price: 3000 },
//     { id: 101, name: '컵라면2', price: 2000 },
//     { id: 102, name: '파3', price: 5000 },
//   ],
// };

type SessionContextProps = {
  session: Session;
  login: ({ id, name }: LoginUser) => void;
  logout: () => void;
  // 여기서는 type 안 맞춰주어도 되나?
  saveCartItem: (id: number, name: string, price: number) => void;
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

  const url = '/data/sample.json';
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetch(url, { signal })
      .then((res) => res.json())
      .then((data) => setSession(data))
      .then(() => console.log('초기 data 세팅 완료!'));

    return () => controller.abort();
  }, []);

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
  const saveCartItem = (id: number, name: string, price: number) => {
    const { cart } = session;
    id = id || Math.max(...session.cart.map((cart) => cart.id), 0) + 1;

    const item = cart.find((item) => item.id === id);

    if (item) {
      item.name = name;
      item.price = price;
    } else {
      cart.push({ id, name, price });
    }

    setSession({
      ...session,
      cart: [...cart],
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
