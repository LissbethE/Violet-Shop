import { useQuery } from '@tanstack/react-query';
import { getOneHundredProducts } from '../../services/apiProducts';

//* Get all product
export function useOneHundredProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['OneHundredProducts'],
    queryFn: () => getOneHundredProducts(),
  });

  const { data: products, results } = data || {};

  return { products, results, isLoading, error };
}
