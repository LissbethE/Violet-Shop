import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateUser as updateUserApi } from '../../../services/apiUser';

//////////////////////////
export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,

    onSuccess: () => {
      toast.success('User successfully edited 🎉');
      queryClient.invalidateQueries({ active: true });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
