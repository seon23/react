type Cart = { id: number; name: string; price: number };
type Session = {
  loginUser: LoginUser | null;
  cart: Cart[];
};

type OutletContext = {
  currItem: Cart;
};

type SaveCartItem = (id: number, name: string, price: number) => void;
type removeCartItem = (id: number) => void;
