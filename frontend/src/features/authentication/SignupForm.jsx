import { useForm } from 'react-hook-form';

import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';

import { useSignup } from './useSignup';
import { useClose } from '../../ui/Modal';

function SignupForm() {
  const close = useClose();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { signup, isLoading } = useSignup();

  function onSubmit({ name, email, password, passwordConfirm }) {
    signup(
      { name, email, password, passwordConfirm },
      { onSettled: () => reset() }
    );

    close(true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <FormRow label="Full name" error={errors?.name?.message}>
        <input
          type="text"
          id="name"
          disabled={isLoading}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <input
          type="email"
          id="email"
          disabled={isLoading}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <input
          type="password"
          id="password"
          disabled={isLoading}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormRow>

      <FormRow>
        <Button type="primary" disabled={isLoading}>
          {!isLoading ? 'Create new user' : 'Loading...'}
        </Button>
      </FormRow>
    </form>
  );
}

// disabled={isLoading} a los botones

export default SignupForm;
