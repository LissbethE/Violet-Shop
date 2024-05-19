import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateOrderToDelivered as updateOrderToDeliveredApi } from '../../../services/apiOrder.js';

export function useUpdateOrderToDelivered() {
  const queryClient = useQueryClient();

  const { mutate: updateOrderToDelivered, isLoading: isUpdating } = useMutation(
    {
      mutationFn: updateOrderToDeliveredApi,

      onSuccess: () => {
        toast.success('The order has been dispatched🎉');
        queryClient.invalidateQueries({ active: true });
      },

      onError: (err) => {
        console.log('Error', err);
        toast.error('Something went awry.');
      },
    }
  );

  return { updateOrderToDelivered, isUpdating };
}
