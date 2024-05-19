import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { login as loginApi } from '../../services/apiAuth';
import { saveData } from '../../utils/saveDataLocalStore';

export function useLogin() {
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: loginApi,

    onSuccess: (user) => {
      toast.success('You have successfully logged in! 🎉');

      queryClient.setQueryData(['user'], user);
      saveData('userLoggedIn', true);
    },

    onError: (err) => {
      console.log('Error', err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isLoading, isError };
}
