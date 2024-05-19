import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { uploadProductImage as uploadProductImageApi } from '../../../services/apiUpload';

//////////////////////////

export function useUploadProductImage() {
  const queryClient = useQueryClient();

  const { mutate: uploadProductImage, isLoading: isUpdatingImage } =
    useMutation({
      mutationFn: uploadProductImageApi,

      onSuccess: () => {
        toast.success('Image uploaded successfully 🎉');
        queryClient.invalidateQueries({ active: true });
      },

      onError: (err) => toast.error(err.message),
    });

  return { uploadProductImage, isUpdatingImage };
}
