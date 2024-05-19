import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createProduct as createProductApi } from '../../../services/apiProducts';

//////////////////////////
export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { mutate: createProduct, isLoading: isCreating } = useMutation({
    mutationFn: createProductApi,

    onSuccess: () => {
      toast.success('New product successfully created 🎉');
      queryClient.invalidateQueries({ active: true });
    },

    onError: (err) => toast.error(err.message),
  });

  return { createProduct, isCreating };
}
