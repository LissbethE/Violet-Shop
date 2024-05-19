import { useQuery } from '@tanstack/react-query';
import { getMyOrders } from '../../services/apiOrder';

//* Get single product

export function useMyOrders() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getMyOrders,
    retry: false,
  });

  const { data: myOrders } = data || {};

  return { myOrders, isLoading, error };
}
