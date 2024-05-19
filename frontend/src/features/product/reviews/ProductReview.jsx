import ErrorMessage from '../../../ui/ErrorMessage';
import SpinnerHeart from '../../../ui/SpinnerHeart';
import { useUser } from '../../user/useUser';
import { useProduct } from '../useProduct';
import CreateReview from './CreateReview';
import ReviewItem from './ReviewItem';

function ProductReview() {
  const { product, isLoading, error } = useProduct();
  const { isLoading: loadingUser, isAuthenticated, currentUser } = useUser();

  if (isLoading || loadingUser) return <SpinnerHeart />;
  if (error) return <ErrorMessage>💥Product not found</ErrorMessage>;

  const { user } = currentUser?.data || {};
  const isSameUser = product?.reviews?.some((e) => e.user === user?._id);
  const isReview = product?.reviews.length > 1 ? false : true;

  return (
    <section className="reviews section-padding-small-2 u-margin-top-medium ">
      <h2 className="heading-2 heading-2--review u-margin-bottom-medium">
        Customer Feedback
      </h2>

      <div className="reviews__container">
        <div className="reviews__content">
          {isReview && <ErrorMessage>💥No reviews</ErrorMessage>}

          {!isReview && (
            <ul className="reviews__list">
              {product?.reviews?.map((review) => (
                <ReviewItem key={review?._id} review={review} />
              ))}
            </ul>
          )}
        </div>

        {isAuthenticated && !isSameUser && <CreateReview />}
      </div>
    </section>
  );
}

export default ProductReview;
