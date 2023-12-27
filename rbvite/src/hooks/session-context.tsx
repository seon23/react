import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { useFetch } from './fetch-hook';

type SessionContextProp = {
  session: Session;
  login: ({ id, name }: LoginUser) => void;
  logout: () => void;
  saveCartItem: (id: number, name: string, price: number) => void;
  removeCartItem: (id: number) => void;
};

const DEFAULT_SESSION = {
  loginUser: null,
  cart: [],
};
const SessionContext = createContext<SessionContextProp>({
  session: DEFAULT_SESSION,
  login: () => {},
  logout: () => {},
  saveCartItem: () => {},
  removeCartItem: () => {},
});

enum ActionType {
  SET_SESSION = 'setSesseion',
  LOGIN = 'login',
  LOGOUT = 'logout',
  SAVE_ITEM = 'saveCartItem',
  REMOVE_ITEM = 'removeCartItem',
}

type Action =
  | { type: ActionType.SET_SESSION; payload: Session }
  | { type: ActionType.LOGIN; payload: LoginUser }
  | { type: ActionType.LOGOUT; payload: null }
  | { type: ActionType.SAVE_ITEM; payload: Cart[] }
  | { type: ActionType.REMOVE_ITEM; payload: number };

const SKEY = 'SESSION';

// const setStorage = (session: Session) => {
const setStorage = (session: Session | undefined) => {
  if (!session) return;
  const { loginUser, cart } = session;
  sessionStorage.setItem(SKEY, JSON.stringify(loginUser));
  localStorage.setItem(SKEY, JSON.stringify(cart));
};

const getStorage = () => {
  const strLoginUser = sessionStorage.getItem(SKEY);
  const strCart = localStorage.getItem(SKEY);
  // if (!strLoginUser || !strCart) return null;
  // if (!strLoginUser || !strCart) return undefined;
  // if (!strCart) return undefined;
  if (!strCart || strCart === '[]') return undefined;

  const loginUser = strLoginUser ? JSON.parse(strLoginUser) : null;
  const cart = strCart ? JSON.parse(strCart) : [];
  return { loginUser, cart };
};

const reducer = (session: Session, action: Action) => {
  let newer: Session;
  switch (action.type) {
    case ActionType.SET_SESSION:
      newer = { ...action.payload };
      break;
    case ActionType.LOGIN:
      newer = { ...session, loginUser: action.payload };
      break;
    case ActionType.LOGOUT:
      newer = { ...session, loginUser: action.payload };
      break;
    case ActionType.SAVE_ITEM:
      newer = { ...session, cart: [...action.payload] };
      break;
    case ActionType.REMOVE_ITEM:
      newer = {
        ...session,
        cart: session?.cart.filter((item) => item.id !== action.payload),
      };
      break;
  }
  //   setStorage(newer);
  setStorage(newer as Session);
  return newer;
};
export const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const storedData = getStorage();
  const [session, dispatch] = useReducer(reducer, DEFAULT_SESSION);

  //   const url = '/data/sample-logined.json';
  const url = '/data/sample.json';

  // const [data, setData] = useState<T | undefined>(cachedData);
  const data = useFetch<Session>(url, storedData);

  useEffect(() => {
    if (data) dispatch({ type: ActionType.SET_SESSION, payload: data });
  }, [data]);

  // const loginHandleRef = useRef<LoginHandle>(null);

  const login = useCallback(({ id, name }: LoginUser) => {
    if (!name) {
      alert('Input name, please!');
      //   loginHandleRef.current?.focusName();
      return;
    }
    dispatch({ type: ActionType.LOGIN, payload: { id, name } });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: ActionType.LOGOUT, payload: null });
    // }, [session]);
  }, []);

  // update 기능도 겸하는
  const saveCartItem = useCallback(
    (id: number, name: string, price: number) => {
      const { cart } = session;
      //   추가할 때는 find해봐야 안 나옴. 수정할 때만 find 사용하도록 바꾸어보자.
      // -> id가 있다면 find해라!
      const item = id && cart.find((item) => item.id === id);
      if (item) {
        item.name = name;
        item.price = price;
      } else {
        // id = id || Math.max(...session.cart.map((cart) => cart.id), 0) + 1;
        cart.push({ id, name, price });
      }
      dispatch({ type: ActionType.SAVE_ITEM, payload: cart });
    },

    [session]
  );

  const removeCartItem = useCallback((itemId: number) => {
    dispatch({ type: ActionType.REMOVE_ITEM, payload: itemId });
  }, []);

  return (
    <SessionContext.Provider
      value={{ session, login, logout, saveCartItem, removeCartItem }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);
