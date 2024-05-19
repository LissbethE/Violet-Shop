import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteUser as deleteUserApi } from '../../../services/apiUser';

//////////////////////////
export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: deleteUserApi,

    onSuccess: () => {
      toast.success('User successfully deleted 🎉');
      queryClient.invalidateQueries({ active: true });
    },

    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteUser };
}
