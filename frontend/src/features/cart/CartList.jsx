import { useSelector } from 'react-redux';

import CartItem from './CartItem';

////////////////////////////

function CartList() {
  const { cart } = useSelector((state) => state.cart);

  ////////////////////////////

  return (
    <ul className={`cart ${cart.length > 2 ? 'cart--scroll' : ''}`}>
      {cart.map((cart) => (
        <CartItem key={cart.name} cart={cart} />
      ))}
    </ul>
  );
}

export default CartList;
