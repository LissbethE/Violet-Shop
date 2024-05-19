import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiUser';

export function useUser() {
  const { data: currentUser, isLoading } = useQuery({
    queryFn: getCurrentUser,
    retry: false,
    queryKey: ['user'],
  });

  return {
    currentUser,
    isLoading,
    isAuthenticated: currentUser ? true : false,
  };
}
