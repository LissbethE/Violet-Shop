import { useUser } from './useUser';

function UserCard() {
  const { currentUser, isLoading } = useUser();

  const { user } = currentUser?.data || {};

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="userCard">
      <div className="userCard__box-photo u-margin-bottom-small">
        <img src={`/img/${user?.image}`} className="userCard__photo" />
      </div>

      <h2 className="heading-2 heading-2--user u-margin-bottom-small-2">
        {user.name}
      </h2>

      <div className="userCard__content">
        <p className="userCard__paragraph">
          <svg className="userCard__icon">
            <use xlinkHref="/img/sprite.svg#icon-location-pin"></use>
          </svg>

          {user.country ? user.country : 'non-country'}
        </p>

        <p className="userCard__paragraph">
          <svg className="userCard__icon">
            <use xlinkHref="/img/sprite.svg#icon-mail"></use>
          </svg>

          {user.email}
        </p>

        <p className="userCard__paragraph">
          <svg className="userCard__icon">
            <use xlinkHref="/img/sprite.svg#icon-phone"></use>
          </svg>

          {user.phone ? user.phone : 'non-phone'}
        </p>
      </div>
    </div>
  );
}

export default UserCard;
