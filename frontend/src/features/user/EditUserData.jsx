import { useClose } from '../../ui/Modal';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { useUser } from './useUser';
import { useUpdateUserProfile } from './useUpdateUserProfile';
import SpinnerHeart from '../../ui/SpinnerHeart';
import { useUploadUserPhoto } from './useUploadUserPhoto';

function EditUserData() {
  const close = useClose();

  const { currentUser, isLoading } = useUser();
  const { isUpdating, updateUserProfile } = useUpdateUserProfile();
  const { uploadUserPhoto, isUpdatingImage } = useUploadUserPhoto();

  const { user } = currentUser?.data || {};
  const userId = user._id;
  const isUser = Boolean(user);

  ////////////////////////////
  // Form

  const { register, formState, handleSubmit } = useForm({
    defaultValues: isUser ? user : {},
  });
  const { errors } = formState;

  function onSubmit({ ...value }) {
    const prevUser = Object.values(user);
    const values = Object.entries(value);
    let entries = [];

    const data = Object.values(value).filter((ele, i) => {
      const text = ele !== '';
      const dif = ele !== prevUser[i] ? (text ? ele : '') : '';

      return dif;
    });

    for (let [key, valor] of values) {
      if (data.includes(valor)) entries.push([key, valor]);
    }

    const update = Object.fromEntries(entries);

    updateUserProfile(update);
    close();
  }

  function onSubmitImage(value) {
    console.log(value);

    if (value?.photo[0]?.name === undefined) return;

    const data = value.photo[0];

    uploadUserPhoto({ userId, data });
  }

  ////////////////////////////

  if (isLoading || isUpdating) return <SpinnerHeart />;

  return (
    <section className="editUserData section-padding-small">
      <section className="u-margin-bottom-medium">
        <h1 className="u-margin-bottom-medium heading-1 heading-1--shipping">
          Edit your data df
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <FormRow label="Name" error={errors?.name?.message}>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              // disabled={isLoading}
              {...register('name', {
                //required: 'This field is required',
              })}
            />
          </FormRow>

          <FormRow label="LastName" error={errors?.lastName?.message}>
            <input
              type="text"
              id="lastName"
              placeholder="Enter lastName"
              // disabled={isLoading}
              {...register('lastName', {
                //required: 'This field is required',
              })}
            />
          </FormRow>

          <FormRow label="Country" error={errors?.country?.message}>
            <input
              type="text"
              id="country"
              placeholder="Enter country"
              // disabled={isLoading}
              {...register('country', {
                //required: 'This field is required',
              })}
            />
          </FormRow>

          <FormRow label="City" error={errors?.city?.message}>
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              // disabled={isLoading}
              {...register('city', {
                // required: 'This field is required',
              })}
            />
          </FormRow>

          <FormRow label="Phone" error={errors?.phone?.message}>
            <input
              type="number"
              id="phone"
              placeholder="Enter phone"
              // disabled={isLoading}
              {...register('phone')}
            />
          </FormRow>

          <FormRow label="Email address" error={errors?.email?.message}>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              //disabled={isLoading}
              {...register('email', {
                //required: 'This field is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please provide a valid email address',
                },
              })}
            />
          </FormRow>

          <FormRow
            label="New password (min 8 characters)"
            error={errors?.password?.message}
          >
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              //disabled={isLoading}
              {...register('password', {
                //required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password needs a minimum of 8 characters',
                },
              })}
            />
          </FormRow>

          <FormRow
            label="Confirm password"
            error={errors?.passwordConfirm?.message}
          >
            <input
              type="password"
              id="passwordConfirm"
              placeholder="Enter password confirm"
              //disabled={isLoading}
              {...register('passwordConfirm', {
                // required: 'This field is required',
                /* validate: (value) =>
                value === getValues().password || 'Passwords need to match',*/
              })}
            />
          </FormRow>

          <FormRow>
            <div className="container-x2">
              <Button type="primary" disabled={isUpdating}>
                Save data
              </Button>
            </div>
          </FormRow>
        </form>
      </section>

      <section className="border-top">
        <h1 className="u-margin-bottom-medium heading-1 heading-1--shipping">
          Edit Photo
        </h1>

        <form onSubmit={handleSubmit(onSubmitImage)} className="form">
          <FormRow label="Photo" error={errors?.photo?.message}>
            <input
              type="file"
              id="image"
              accept="image/*"
              placeholder="Choose File"
              className="inputFile"
              disabled={isUpdating}
              {...register('photo')}
            />
          </FormRow>

          <FormRow>
            <Button type="primary" disabled={isUpdatingImage}>
              Save Picture
            </Button>
          </FormRow>
        </form>
      </section>
    </section>
  );
}

export default EditUserData;

/*

   <FormRow label="Avatar image" error={errors?.photo?.message}>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={(e) => {
              e.preventDefault();
              setAvatar(e.target.files[0]);
            }}
            {...register('photo')}
            //  disabled={isUpdating}
          />
        </FormRow>
        */
