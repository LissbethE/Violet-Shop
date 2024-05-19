import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateUserProfile as updateUserProfileApi } from '../../services/apiUser';

//////////////////////////
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  const { mutate: updateUserProfile, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserProfileApi,

    onSuccess: () => {
      toast.success('User account successfully updated 🎉');

      queryClient.invalidateQueries({ queryKey: ['user'] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUserProfile };
}
