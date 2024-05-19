import { useQuery } from '@tanstack/react-query';
import { getPayPalClientId } from '../../services/apiPaypal';

//* Get single product

export function usePayPalClientId() {
  const {
    data: paypal,
    isLoading: loadingPaypal,
    error,
  } = useQuery({
    queryFn: getPayPalClientId,
    queryKey: ['paypal'],
    retry: false,
  });

  return { paypal, loadingPaypal, error };
}
