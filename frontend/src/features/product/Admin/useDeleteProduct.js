import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteProduct as deleteProductApi } from '../../../services/apiProducts';

//////////////////////////
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductApi,

    onSuccess: () => {
      toast.success('Prodcut successfully deleted 🎉');
      queryClient.invalidateQueries({ active: true });
    },

    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteProduct };
}
