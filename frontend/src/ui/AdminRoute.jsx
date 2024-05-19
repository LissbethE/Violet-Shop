import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useUser } from '../features/user/useUser';
import SpinnerHeart from './SpinnerHeart';
import { getData } from '../utils/saveDataLocalStore';

function AdminRoute() {
  const userLoggedIn = getData('userLoggedIn');
  const navigate = useNavigate();

  const { currentUser, isLoading, isAuthenticated } = useUser();
  const { user } = currentUser?.data || {};

  useEffect(
    function () {
      if (!userLoggedIn && !isAuthenticated && !isLoading) {
        if (user?.role !== 'admin') {
          navigate('/*?error=NoEresAdmin', {
            replace: true,
          });
        } else {
          navigate('/*?error=unauthorized', {
            replace: true,
          });
        }
      }
    },
    [isAuthenticated, isLoading, userLoggedIn, navigate, user?.role]
  );

  if (isLoading) return <SpinnerHeart />;

  if (isAuthenticated && user?.role === 'admin') return <Outlet />;
}

export default AdminRoute;
