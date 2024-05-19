import Button from '../../ui/Button';
import SpinnerHeart from '../../ui/SpinnerHeart';
import ShippingAddress from '../shipping/ShippingAddress';
import UserCard from './UserCard';
import UserData from './UserData';
import { useUser } from './useUser';

function Profile() {
  const { currentUser, isLoading } = useUser();
  const { user } = currentUser?.data || {};

  if (isLoading) return <SpinnerHeart />;

  return (
    <section className="profile section-padding">
      <div className="profile__container">
        <UserCard />
        <UserData />
        <ShippingAddress />

        <div className="profile__buttons">
          {user.role === 'user' && (
            <>
              <Button type="primary" to="/myOrders">
                My Orders
              </Button>
            </>
          )}

          {user.role == 'admin' && (
            <>
              <Button type="primary" to="/admin/orderList">
                Orders
              </Button>

              <Button type="primary" to="/admin/productList">
                Products
              </Button>

              <Button type="primary" to="/admin/userList">
                Users
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
