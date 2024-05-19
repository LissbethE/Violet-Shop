import StarRating from '../../../ui/StarRating/StarRating';

function ReviewItem({ review }) {
  return (
    <li className="reviews__item">
      <div className="reviews__user">
        <div className="reviews__box-photo">
          <img src={`/img/${review.image}`} className="reviews__photo" />
        </div>

        <h3 className="heading-4 heading-4--review">{review.name}</h3>
      </div>

      <div className="reviews__texts">
        <StarRating
          size={20}
          defaultRating={review.rating}
          fixedRating={true}
        />

        <p className="u-margin-top-small paragraph ">{review.comment}</p>

        <p className="paragraph--review">
          Date: {review.createdAt.substring(0, 10)}
        </p>
      </div>
    </li>
  );
}

export default ReviewItem;
