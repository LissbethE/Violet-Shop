import OrderItem from '../../features/order/OrderItem';
import Orders from '../../features/order/Orders';
import SpinnerHeart from '../../ui/SpinnerHeart';
import { useOrders } from '../../features/order/admin/useOrders';

function AdminOrderList() {
  const { allOrders, isLoading } = useOrders();

  if (isLoading) return <SpinnerHeart />;

  return (
    <Orders>
      <ul
        className={`orders__list ${
          allOrders?.length === 2 ? 'orders__list--only2 ' : ''
        }`}
      >
        {!allOrders && <p>No Order</p>}

        {allOrders.map((order, index) => (
          <OrderItem key={order._id} order={order} index={index} />
        ))}
      </ul>
    </Orders>
  );
}

export default AdminOrderList;
