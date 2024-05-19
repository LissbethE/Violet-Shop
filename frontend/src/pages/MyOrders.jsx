import OrderItem from '../features/order/OrderItem';
import Orders from '../features/order/Orders';
import { useMyOrders } from '../features/order/useMyOrders';
import SpinnerHeart from '../ui/SpinnerHeart';

function MyOrders() {
  const { myOrders, isLoading } = useMyOrders();

  if (isLoading) return <SpinnerHeart />;

  return (
    <Orders>
      <ul
        className={`orders__list ${
          myOrders.length === 2 ? 'orders__list--only2 ' : ''
        }`}
      >
        {!myOrders && <p>No Order</p>}

        {myOrders.map((order, index) => (
          <OrderItem key={order._id} order={order} index={index} />
        ))}
      </ul>
    </Orders>
  );
}

export default MyOrders;
