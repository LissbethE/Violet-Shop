import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { clearPaymentMethod, savePaymentMethod } from './paymentSlice';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';

function PaymentMethod() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { paymentMethod } = useSelector((state) => state.payment);
  const isPaymentMethod = Boolean(paymentMethod);

  ////////////////////////////
  // Form

  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: isPaymentMethod ? paymentMethod : '',
  });
  const { errors } = formState;

  function onSubmit({ paypal }) {
    const isPaypal = paypal === 'on' && 'PayPal';
    dispatch(savePaymentMethod(isPaypal));
    navigate('/order');
  }

  ////////////////////////////

  return (
    <section className="section-padding-small">
      <h1 className="u-margin-bottom-medium heading-1 heading-1--shipping">
        Payment Method
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <FormRow
          radio={true}
          label="PayPal or Credit Card"
          error={errors?.paypal?.message}
        >
          <input
            className="radio"
            type="radio"
            id="paypal"
            name="paypal"
            checked
            {...register('paypal', {
              required: 'This field is required',
            })}
          />
        </FormRow>

        <FormRow>
          <div className="container-x2">
            <Button
              type="dark"
              onClick={(e) => {
                e.preventDefault();

                reset();
                dispatch(clearPaymentMethod());
              }}
            >
              Delete
            </Button>

            <Button type="primary">Continue</Button>
          </div>
        </FormRow>
      </form>
    </section>
  );
}

export default PaymentMethod;
