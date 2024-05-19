import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../../services/apiProducts';
import { useParams } from 'react-router-dom';

//* Get single product

export function useProduct(id) {
  const { id: paramsID } = useParams();

  const productId = id || paramsID;

  const { data, isLoading, error } = useQuery({
    queryKey: ['Product', productId],
    queryFn: () => getProduct(productId),
    retry: false,
  });

  const { data: product } = data || {};

  return { product, isLoading, error };
}
