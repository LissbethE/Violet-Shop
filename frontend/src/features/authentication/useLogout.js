import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { logout as logoutApi } from '../../services/apiAuth';
import { clearData } from '../../utils/saveDataLocalStore';

export function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      toast.success('Logged out successfully 🎉');

      // queryClient.removeQueries();
      // queryClient.clear();
      queryClient.removeQueries({ queryKey: ['user'], exact: true });
      clearData();

      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    },
  });

  return { logout, isLoading };
}
