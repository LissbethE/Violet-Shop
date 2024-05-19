import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import toast from 'react-hot-toast';

import CartSummury from '../features/cart/CartSummury';
import SpinnerHeart from '../ui/SpinnerHeart';

import { usePayPalClientId } from '../features/payment/usePayPalClientId';
import { useOrder } from '../features/order/useOrder';
import { useUpdateOrderToPaid } from '../features/order/useUpdateOrderToPaid';
import { formatCurrency } from '../utils/helpers';
import { useUser } from '../features/user/useUser';
import { useUpdateOrderToDelivered } from '../features/order/admin/useUpdateOrderToDelivered';
import Button from '../ui/Button';

///////////////////////////////
function OrderDetails() {
  const { id: orderId } = useParams();

  const { order, isLoading: loadingOrder } = useOrder();
  const { currentUser, isLoading: loadingUser } = useUser();
  const { updateOrderToPaid, isUpdating } = useUpdateOrderToPaid();
  const { paypal, loadingPaypal, error: errorPaypal } = usePayPalClientId();
  const { updateOrderToDelivered, isUpdating: loadingDeliver } =
    useUpdateOrderToDelivered();

  const [{ isPending }, dispatch] = usePayPalScriptReducer();

  const { user } = currentUser?.data || {};
  ///////////////////////////////

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order?.total },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(function (details) {
      try {
        updateOrderToPaid({ orderId, details });
      } catch (err) {
        toast.success(err?.data?.message || err.error);
      }
    });
  }

  function onError(err) {
    toast.success(err?.message || err.error);
  }

  ///////////////////////////////

  function deliverOrderHandler() {
    updateOrderToDelivered(order._id);
  }

  ///////////////////////////////

  useEffect(
    function () {
      if (!errorPaypal && !loadingPaypal && paypal?.clientId) {
        const loadPaypalScript = async () => {
          dispatch({
            type: 'resetOptions',
            value: {
              'client-id': paypal?.clientId,
              currency: 'USD',
            },
          });

          dispatch({ type: 'setLoadingStatus', value: 'pending' });
        };

        if (order && !order?.isPaid) {
          if (!window.paypal) {
            loadPaypalScript();
          }
        }
      }
    },
    [errorPaypal, loadingPaypal, dispatch, order, paypal?.clientId]
  );

  if (loadingOrder || loadingUser || loadingDeliver) return <SpinnerHeart />;

  /////////////////////////////
  return (
    <section className="order section-padding-small">
      <h2 className="heading-2 heading-2--order u-margin-bottom-medium">
        <span>Order ID:</span> {order._id}
      </h2>

      <div className="order__container order__container--details">
        <div>
          <div className="u-margin-bottom-medium ">
            <h3 className="heading-3 heading-3--order u-margin-bottom-small ">
              Your data
            </h3>

            <p className="order__paragraph paragraph">
              <span>Name:</span>
              {order.user.name}
            </p>

            <p className="order__paragraph paragraph">
              <span>Email:</span>
              {order.user.email}
            </p>
          </div>

          <div className="u-margin-bottom-medium ">
            <h3 className="heading-3 heading-3--order u-margin-bottom-small ">
              Shipping
            </h3>

            <p className="order__paragraph paragraph">
              <span>Address:</span>
              {order.shippingAddress.address}
            </p>

            <p className="order__paragraph paragraph">
              <span>Country:</span>
              {order.shippingAddress.country}
            </p>

            <p className="order__paragraph paragraph">
              <span>City:</span>
              {order.shippingAddress.city}
            </p>

            <p className="order__paragraph paragraph u-margin-bottom-small-2">
              <span>Postal Code:</span>
              {order.shippingAddress.postalCode}
            </p>

            {order?.isDelivered ? (
              <p className="correctMessage">
                ✅ Delivery on {order.deliveredAt}
              </p>
            ) : (
              <p className="errorMessage">💥Not Delivered</p>
            )}

            {user?.role === 'admin' && order?.isPaid && !order?.isDelivered && (
              <div className="u-margin-top-small">
                <Button type="primary" onClick={deliverOrderHandler}>
                  Mark As Delivered
                </Button>
              </div>
            )}
          </div>

          <div className="u-margin-bottom-medium ">
            <h3 className="heading-3 heading-3--order u-margin-bottom-small ">
              Payment Method
            </h3>

            <p className="order__paragraph paragraph">
              <span>Method:</span>
              {order?.paymentMethod}
            </p>

            {order?.isPaid ? (
              <p className="correctMessage">✅ Paid on {order.paidAt}</p>
            ) : (
              <p className="errorMessage">💥Not Paid</p>
            )}
          </div>

          <div className="u-margin-bottom-medium ">
            <h3 className="heading-3 heading-3--order u-margin-bottom-small">
              Order Items
            </h3>

            <ul className="order__products">
              {order?.orderItems.map((cart) => (
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

        <div className="order__cartSummury">
          {isUpdating && <SpinnerHeart />}

          <CartSummury inOrder={true}>
            {isPending ? (
              <SpinnerHeart />
            ) : (
              <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              ></PayPalButtons>
            )}
          </CartSummury>
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;
