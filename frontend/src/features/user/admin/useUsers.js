import { useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getUsers } from '../../../services/apiUser';

export function useUser() {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryFn: getUsers,
    queryKey: ['users'],

    onSuccess: (users) => {
      queryClient.setQueryData(['users'], users);
    },

    onError: (err) => {
      console.log('Error', err);
      toast.error('Users not found 💥');
    },
  });

  return {
    users,
    isLoading,
  };
}
