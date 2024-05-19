import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateProduct as updateProductApi } from '../../../services/apiProducts';

//////////////////////////
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { mutate: updateProduct, isLoading: isUpdating } = useMutation({
    mutationFn: updateProductApi,

    onSuccess: () => {
      toast.success('Product successfully edited 🎉');
      queryClient.invalidateQueries({ active: true });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updateProduct, isUpdating };
}
