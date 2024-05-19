import { useForm } from 'react-hook-form';
import FormRow from '../../../ui/FormRow';
import { useCreatedProductReview } from './useCreatedProductReview';
import StarRating from '../../../ui/StarRating/StarRating';
import Button from '../../../ui/Button';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function CreateReview() {
  const { createReview, isCreating } = useCreatedProductReview();
  const [userRating, setUserRating] = useState('');
  const { id: productId } = useParams();

  ////////////////////////////
  // Form

  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  function onSubmit({ ...value }) {
    const data = { ...value, rating: userRating || 1 };

    createReview({ productId, data });
  }

  ////////////////////////////
  return (
    <section className="review-form">
      <h3 className="heading-3  u-margin-bottom-medium">
        Write a customer review
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="form form--review">
        <StarRating size={30} onSetRating={setUserRating} />

        <FormRow label="Comment" error={errors?.comment?.message}>
          <textarea
            id="comment"
            rows={3}
            placeholder="Enter comment"
            disabled={isCreating}
            {...register('comment', {
              required: 'This field is required',
            })}
          ></textarea>
        </FormRow>

        <FormRow>
          <Button type="primary" disabled={isCreating}>
            Submit
          </Button>
        </FormRow>
      </form>
    </section>
  );
}

export default CreateReview;
