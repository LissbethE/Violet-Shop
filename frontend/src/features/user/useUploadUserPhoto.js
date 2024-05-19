import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { uploadUserPhoto as uploadUserPhotoApi } from '../../services/apiUpload';

//////////////////////////

export function useUploadUserPhoto() {
  const queryClient = useQueryClient();

  const { mutate: uploadUserPhoto, isLoading: isUpdatingImage } = useMutation({
    mutationFn: uploadUserPhotoApi,

    onSuccess: () => {
      toast.success('Image uploaded successfully 🎉');
      queryClient.invalidateQueries({ active: true });
    },

    onError: (err) => toast.error(err.message),
  });

  return { uploadUserPhoto, isUpdatingImage };
}
