import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useUser } from '../features/user/useUser';
import SpinnerHeart from './SpinnerHeart';
import { getData } from '../utils/saveDataLocalStore';

function ProtectedRoute() {
  const userLoggedIn = getData('userLoggedIn');
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, open modal
  useEffect(
    function () {
      if (!userLoggedIn && !isAuthenticated && !isLoading)
        navigate('/*?error=unauthorized', {
          replace: true,
        });
    },
    [isAuthenticated, isLoading, userLoggedIn, navigate]
  );

  // 3. While loading, show a spinner
  if (isLoading) return <SpinnerHeart />;

  // 4. If there IS a user, render the app
  // if (isAuthenticated) return children;
  if (isAuthenticated) return <Outlet />;
}

export default ProtectedRoute;
