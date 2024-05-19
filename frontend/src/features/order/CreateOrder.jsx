import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { formatCurrency } from '../../utils/helpers';
import { useCreateOrder } from './useCreateOrder';
import { useUser } from '../user/useUser';
import { getTotalCartPrice } from '../cart/cartSlice';
import Button from '../../ui/Button';

/////////////////////////////

function CreateOrder() {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { paymentMethod } = useSelector((state) => state.payment);
  const { shippingAddress } = useSelector((state) => state.shippingAddress);

  const totalPrice = useSelector(getTotalCartPrice);

  const { createOrder, isCreating } = useCreateOrder();
  const { currentUser } = useUser();

  /////////////////////////////

  const tax = 0.15 * totalPrice;
  const delivery = totalPrice > 100 ? 0 : 15;
  const total = totalPrice + delivery + tax;

  /////////////////////////////

  useEffect(
    function () {
      if (!shippingAddress.address) navigate('/shipping');
      else if (!paymentMethod) navigate('/payment');
    },
    [shippingAddress.address, paymentMethod, navigate]
  );

  /////////////////////////////

  function handlerCreateOrder() {
    const newOrder = {
      orderItems: cart,
      user: currentUser.data.user._id,
      shippingAddress: shippingAddress,
      paymentMethod,
      shippingPrice: delivery,
      taxPrice: tax,
      subTotal: totalPrice,
      total: total.toFixed(2),
    };

    createOrder(newOrder);
  }

  /////////////////////////////
  return (
    <section className="order section-padding-small">
      <div className="order__container">
        <div>
          <div className="u-margin-bottom-medium ">
            <h3 className="heading-3 heading-3--order u-margin-bottom-small ">
              Shipping
            </h3>

            <p className="order__paragraph paragraph">
              <span>Address:</span>
              {shippingAddress.address}
            </p>

            <p className="order__paragraph paragraph">
              <span>Country:</span>
              {shippingAddress.country}
            </p>

            <p className="order__paragraph paragraph">
              <span>City:</span>
              {shippingAddress.city}
            </p>

            <p className="order__paragraph paragraph">
              <span>Postal Code:</span>
              {shippingAddress.postalCode}
            </p>
          </div>

          <div className="u-margin-bottom-medium ">
            <h3 className="heading-3 heading-3--order u-margin-bottom-small ">
              Payment Method
            </h3>

            <p className="order__paragraph paragraph">
              <span>Method:</span>
              {paymentMethod}
            </p>
          </div>

          <div className="u-margin-bottom-medium ">
            <h3 className="heading-3 heading-3--order u-margin-bottom-small">
              Order Items
            </h3>

            <ul className="order__products">
              {cart.map((cart) => (
                <li key={cart.name} className="order__product">
                  <div className="order__bg-img">
                    <img src={`/img/${cart.image}`} className="order__img" />
                  </div>

                  <h4 className="heading-4 heading-4--proOrder">{cart.name}</h4>

                  <p className="order__price">
                    <span>{cart.quantity}</span> x <span>{cart.price}</span> =
                    <span>{formatCurrency(cart.quantity * cart.price)}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="order__col-2">
          <h3 className="order__heading-3">Is the data correct?</h3>

          <Button
            type="primary"
            onClick={handlerCreateOrder}
            disabled={isCreating}
          >
            Yes, establish order
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CreateOrder;
