import { useDispatch, useSelector } from 'react-redux';
import {
  clearShippingAddress,
  saveShippingAddress,
} from '../shipping/shippingAddressSlice';
import FormRow from '../../ui/FormRow';
import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

////////////////////////////
function CreateShippingAddress() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.shippingAddress);
  const isshippingAddress = Boolean(shippingAddress);

  ////////////////////////////
  // Form

  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: isshippingAddress ? shippingAddress : {},
  });
  const { errors } = formState;

  function onSubmit({ ...value }) {
    dispatch(saveShippingAddress(value));

    navigate('/payment');
  }

  ////////////////////////////

  return (
    <section className="shipping section-padding-shipping">
      <h1 className="u-margin-bottom-medium heading-1 heading-1--shipping">
        Shipping Address
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

            <Button type="primary">Continue</Button>
          </div>
        </FormRow>
      </form>
    </section>
  );
}

export default CreateShippingAddress;
