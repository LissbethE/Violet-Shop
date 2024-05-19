import { useSelector } from 'react-redux';
import { getTotalCartPrice } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { useOrder } from '../order/useOrder';
import SpinnerHeart from '../../ui/SpinnerHeart';

function CartSummury({ inOrder, children }) {
  const { order, isLoading: loadingOrder } = useOrder();
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (loadingOrder) return <SpinnerHeart />;

  /////////////////////////////

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const calcTax = 0.15 * totalCartPrice;
  const delivery = totalCartPrice > 100 ? 0 : 15;
  const calcTotal = totalCartPrice + delivery + calcTax;

  /////////////////////////////

  const tax = order ? addDecimals(order?.taxPrice) : addDecimals(calcTax);

  const sunTotal = order
    ? formatCurrency(order?.subTotal)
    : formatCurrency(totalCartPrice);

  const total = order
    ? formatCurrency(order?.total)
    : formatCurrency(calcTotal);

  const isFree =
    delivery === 0 || order?.shippingPrice === 0 ? 'Free' : formatCurrency(15);

  /////////////////////////////

  return (
    <section className={`summury ${inOrder ? 'summury--order' : ''}`}>
      <h3 className="heading-3 heading-3--white u-margin-bottom-medium">
        Order Summury
      </h3>

      <div className="summury__content u-margin-bottom-medium">
        <div className="summury__box u-margin-bottom-small-2">
          <p className="paragraph paragraph--cartSum">Subtotal:</p>
          <p className="paragraph paragraph--cartSum">{sunTotal}</p>
        </div>

        <div className="summury__box">
          <p> VAT Tax:</p>
          <p>15%</p>
        </div>

        <div className="summury__box">
          <p>Iva:</p>
          <p>{tax}</p>
        </div>

        <div className="summury__box u-margin-bottom-small-2">
          <p>Delivery:</p>
          <p>{isFree}</p>
        </div>

        <div className="summury__box summury__box--total">
          <p className="paragraph paragraph--cartSum">Total:</p>
          <p className="paragraph paragraph--cartSum">{total}</p>
        </div>
      </div>

      {children}
    </section>
  );
}

export default CartSummury;
