import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../../services/apiOrder';
import { useParams } from 'react-router-dom';

//* Get single order

export function useOrder() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrderById(id),
    retry: false,
  });

  const { data: order } = data || {};

  return { order, isLoading, error };
}
