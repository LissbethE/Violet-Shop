import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { useUser } from '../user/useUser';

function OrderItem({ order, index }) {
  const { currentUser } = useUser();
  const { user } = currentUser?.data || {};

  return (
    <li className={`order-item`}>
      <div
        className={`order-item__col order-item__col-1 ${
          user.role === 'admin' ? 'order-item__admin' : ''
        }`}
      >
        <div>
          <h3 className="heading-3">Order # {index + 1}</h3>
          <p>
            <span>ID:</span> #{order._id}
          </p>
          <p>
            <span>Date:</span> {order?.createdAt?.substring(0, 10)}
          </p>
        </div>

        {user.role === 'admin' && (
          <div className="order-item__user">
            <img
              src={`/img/${order.user.image}`}
              className="order-item__user-photo"
            />

            <h4 className="order-item__user-name">{order.user.name}</h4>
          </div>
        )}
      </div>

      <ul className="order-item__list order-item__col">
        {order.orderItems.map((prod) => (
          <li key={prod._id} className="order-item__prod">
            <div className="order-item__bgImg">
              <img src={`/img/${prod.image}`} className="order-item__img" />
            </div>

            <div className="order-item__prodTexts">
              <h4 className="heading-4">{prod.name}</h4>
              <p>{formatCurrency(prod.price)}</p>
              <p>Qty: {prod.quantity}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="order-item__col order-item__col-3">
        <div className="order-item__texts">
          <p>x{order.orderItems.length} Items</p>

          <p>
            <span>Total:</span> {formatCurrency(order.total)}
          </p>

          <p>
            <span>Paid:</span>
            {!order?.paidAt ? (
              '💥 Not Paid'
            ) : (
              <>
                {order?.paidAt?.substring(0, 10)}
                <span className="complete"> {order.paymentResult?.status}</span>
              </>
            )}
          </p>

          <p>
            <span>Delivered:</span>
            {order?.isDelivered ? (
              <>
                {order?.deliveredAt?.substring(0, 10)}
                <span className="sent">SENT</span>
              </>
            ) : (
              '💥'
            )}
          </p>
        </div>

        <div className="order-item__boxBtn">
          <Button type="primary" to={`/order/${order._id}`}>
            Details
          </Button>
        </div>
      </div>
    </li>
  );
}

export default OrderItem;
