import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../../../services/apiOrder';

//* Admin. Get All Orders

export function useOrders() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  const { data: allOrders } = data || {};

  return { allOrders, isLoading, error };
}
