import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createdProductReview as createdProductReviewApi } from '../../../services/apiProducts';

//////////////////////////
export function useCreatedProductReview() {
  const queryClient = useQueryClient();

  const { mutate: createReview, isLoading: isCreating } = useMutation({
    mutationFn: createdProductReviewApi,

    onSuccess: () => {
      toast.success('Review added 🎉');
      queryClient.invalidateQueries({ active: true });
    },

    onError: (err) => {
      toast.error('Product already reviewed');
      console.log(err.message);
    },
  });

  return { createReview, isCreating };
}
