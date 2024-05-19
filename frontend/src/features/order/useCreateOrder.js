import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createOrder as createOrderApi } from '../../services/apiOrder.js';
import { useDispatch } from 'react-redux';
import { clearCart } from '../cart/cartSlice.js';
import { useNavigate } from 'react-router-dom';

export function useCreateOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: createOrder, isLoading: isCreating } = useMutation({
    mutationFn: createOrderApi,

    onSuccess: (order) => {
      //toast.success('New order successfully created 🎉');

      queryClient.setQueryData(['oder'], order);
      dispatch(clearCart());

      navigate(`/order/${order.data._id}`);
    },

    onError: (err) => {
      console.log('Error', err);
      toast.error('Something went awry.');
    },
  });

  return { createOrder, isCreating };
}
