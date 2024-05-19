import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { signup as signupApi } from '../../services/apiAuth.js';
import { saveData } from '../../utils/saveDataLocalStore.js';

export function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,

    onSuccess: (user) => {
      toast.success('Account created successfully! 🎉');

      queryClient.setQueryData(['user'], user);
      saveData('userLoggedIn', true);
    },

    onError: (err) => {
      console.log('Error', err);
      toast.error('Data invalid');
    },
  });

  return { signup, isLoading };
}
