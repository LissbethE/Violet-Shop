import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateOrderToPaid as updateOrderToPaidApi } from '../../services/apiOrder.js';
import { useNavigate } from 'react-router-dom';

export function useUpdateOrderToPaid() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updateOrderToPaid, isLoading: isUpdating } = useMutation({
    mutationFn: updateOrderToPaidApi,

    onSuccess: () => {
      toast.success('Order is paid 🎉');
      queryClient.invalidateQueries({ active: true });

      navigate(`/myOrders`);
    },

    onError: (err) => {
      console.log('Error', err);
      toast.error('Something went awry.');
    },
  });

  return { updateOrderToPaid, isUpdating };
}
