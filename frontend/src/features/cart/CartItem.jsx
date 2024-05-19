import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../ui/Button';

import UpdateItemQuantity from './UpdateItemQuantity';
import { deleteItem, getCurrentQuantityById } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

////////////////////////////

function CartItem({ cart }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(cart.productId));

  ////////////////////////////

  return (
    <li className={`cart__item `}>
      <Link to={`/product/${cart.productId}`} className="cart__content">
        <p className="paragraph paragraph--cart cart__qty">{cart.quantity} x</p>

        <div className="cart__bg-img">
          <img src={`/img/${cart.image}`} className="cart__img" />
        </div>

        <div className="cart__box-text">
          <h4 className="heading-4 heading-4--cart">{cart.name}</h4>

          <p className="paragraph">
            Sizes: <span>{cart.size || '💥NO-SIZE'}</span>
          </p>

          <p className="paragraph paragraph--small">
            Total:
            <span>{formatCurrency(cart.totalPrice)}</span>
          </p>
        </div>
      </Link>

      <UpdateItemQuantity
        productId={cart.productId}
        currentQuantity={currentQuantity}
        countInStock={cart.countInStock}
      />

      <Button type="dark" onClick={() => dispatch(deleteItem(cart.productId))}>
        Delete
      </Button>
    </li>
  );
}

export default CartItem;
