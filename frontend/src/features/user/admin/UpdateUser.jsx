import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormRow from '../../../ui/FormRow';
import { useUpdateUser } from './useUpdateUser';
import Button from '../../../ui/Button';
import SpinnerHeart from '../../../ui/SpinnerHeart';

function UpdateUser() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId') || '';
  const { updateUser, isUpdating } = useUpdateUser();

  ////////////////////////////
  // Form
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  function onSubmit({ ...value }) {
    const data = value;
    updateUser({ userId, data });
  }

  ////////////////////////////

  if (isUpdating) return <SpinnerHeart />;

  return (
    <section className="section-padding-small updateUser">
      <h1 className="u-margin-bottom-medium heading-1 heading-1--shipping">
        Update User
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <FormRow label="Name" error={errors?.name?.message}>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            disabled={isUpdating}
            {...register('name')}
          />
        </FormRow>

        <FormRow label="Email" error={errors?.email?.message}>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            disabled={isUpdating}
            {...register('email')}
          />
        </FormRow>

        <FormRow label="Role (user, admin)" error={errors?.role?.message}>
          <input
            type="text"
            id="role"
            placeholder="Enter role"
            disabled={isUpdating}
            {...register('role')}
          />
        </FormRow>

        <FormRow>
          <Button type="primary" disabled={isUpdating}>
            Improving the user
          </Button>
        </FormRow>
      </form>
    </section>
  );
}

export default UpdateUser;
