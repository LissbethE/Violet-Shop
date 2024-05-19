import Button from '../../ui/Button';
import { useLogout } from './useLogout';

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <Button type="primarySmall" onClick={logout} disabled={isLoading}>
      {!isLoading ? 'Logout' : 'Loading...'}
    </Button>
  );
}

export default Logout;
