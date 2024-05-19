import { useForm } from 'react-hook-form';

import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';

import { useLogin } from './useLogin';
import { useClose } from '../../ui/Modal';

function LoginForm() {
  const close = useClose();
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { login, isLoading } = useLogin();

  function onSubmit({ email, password }) {
    login({ email, password }, { onSettled: () => reset() });

    close(true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <FormRow label="Email address" error={errors?.email?.message}>
        <input
          type="email"
          id="email"
          autoComplete="username"
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
          autoComplete="current-password"
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

      <FormRow>
        <Button type="primary" disabled={isLoading}>
          {!isLoading ? 'Login' : 'Loading...'}
        </Button>

        {/*   <Button size="large" disabled={isLoading}>
          {!isLoading ? 'Login' : <SpinnerMini />}
        </Button>*/}
      </FormRow>
    </form>
  );
}

export default LoginForm;
