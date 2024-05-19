import { Link } from 'react-router-dom';
import { useUser } from './useUser';

function UserAvatar() {
  const { currentUser } = useUser();
  const { user } = currentUser?.data || {};

  return (
    <Link to="/profile">
      <div className="userAvatar">
        <img src={`/img/${user?.image}`} className="userAvatar__photo" />
      </div>
    </Link>
  );
}

export default UserAvatar;
