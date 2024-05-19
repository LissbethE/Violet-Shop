import { useDispatch, useSelector } from 'react-redux';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import {
  clearShippingAddress,
  editShippingAddress,
} from './shippingAddressSlice';
import { useForm } from 'react-hook-form';
import { useClose } from '../../ui/Modal';

function EditShippingAddress() {
  const dispatch = useDispatch();
  const close = useClose();

  const { shippingAddress } = useSelector((state) => state.shippingAddress);
  const isshippingAddress = Boolean(shippingAddress);

  ////////////////////////////
  // Form

  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: isshippingAddress ? shippingAddress : {},
  });
  const { errors } = formState;

  function onSubmit({ ...value }) {
    dispatch(editShippingAddress(value));
    close();
  }

  ////////////////////////////

  return (
    <section className="editAddress section-padding-small">
      <h1 className="u-margin-bottom-medium heading-1 heading-1--shipping">
        Edit Shipping Address
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <FormRow label="Address" error={errors?.address?.message}>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            // disabled={isLoading}
            {...register('address', {
              required: 'This field is required',
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
              required: 'This field is required',
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
              required: 'This field is required',
            })}
          />
        </FormRow>

        <FormRow label="Postal Code" error={errors?.postalCode?.message}>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            // disabled={isLoading}
            {...register('postalCode')}
          />
        </FormRow>

        <FormRow>
          <div className="container-x2">
            <Button
              type="dark"
              onClick={(e) => {
                e.preventDefault();

                reset();
                dispatch(clearShippingAddress());
              }}
            >
              Delete Address
            </Button>

            <Button type="primary">Save Address</Button>
          </div>
        </FormRow>
      </form>
    </section>
  );
}

export default EditShippingAddress;
