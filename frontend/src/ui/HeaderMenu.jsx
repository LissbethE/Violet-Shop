import { useUser } from '../features/user/useUser';
import Logout from '../features/authentication/Logout';
import ModalAuth from './ModalAuth';
import UserAvatar from '../features/user/UserAvatar';
import { useEffect, useState } from 'react';
import { getData } from '../utils/saveDataLocalStore';

function HeaderMenu() {
  const userLoggedIn = getData('userLoggedIn');
  const { isAuthenticated } = useUser();
  const [isUser, setIsUser] = useState(false);

  useEffect(
    function () {
      if (isAuthenticated && userLoggedIn) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    },
    [isAuthenticated, userLoggedIn]
  );

  return (
    <>
      {isUser ? (
        <>
          <UserAvatar />
          <Logout />
        </>
      ) : (
        <ModalAuth />
      )}
    </>
  );
}

export default HeaderMenu;
