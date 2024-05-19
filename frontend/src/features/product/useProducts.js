import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllProducts } from '../../services/apiProducts';
import { useParams, useSearchParams } from 'react-router-dom';

//* Get all product
export function useProducts() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { category } = useParams();

  // PAGINATING
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const { data, isLoading, error } = useQuery({
    queryKey: ['Products', page, category],
    queryFn: () => getAllProducts({ page, category }),
  });

  const { data: products, results, countProducts, limit } = data || {};

  //////////////////////////
  // PRE-FETCHING
  const pageCount = Math.ceil(countProducts / limit);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['Products', category, page + 1],
      queryFn: () => getAllProducts({ category, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['Products', category, page - 1],
      queryFn: () => getAllProducts({ category, page: page - 1 }),
    });

  //////////////////////////

  return { products, results, isLoading, error, countProducts, limit };
}
