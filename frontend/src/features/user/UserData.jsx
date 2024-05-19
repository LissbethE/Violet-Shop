import BtnHover from '../../ui/BtnHover';
import Modal from '../../ui/Modal';
import EditUserData from './EditUserData';
import { useUser } from './useUser';

function UserData() {
  const { currentUser, isLoading } = useUser();

  const { user } = currentUser?.data || {};

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="userData">
      <div className="userData__box-title u-margin-bottom-small-2 ">
        <h3 className="heading-3 heading-3--userData">Account Details</h3>

        <Modal>
          <Modal.Open opens="userData">
            <BtnHover>
              <svg className="userData__icon">
                <use xlinkHref="/img/sprite.svg#icon-new-message"></use>
              </svg>
            </BtnHover>
          </Modal.Open>

          <Modal.Window name="userData">
            <EditUserData />
          </Modal.Window>
        </Modal>
      </div>

      <div className="userData__content">
        <p className="userData__paragraph">
          <span>Name:</span>
          {user.name}
        </p>

        <p className="userData__paragraph">
          <span>LastName:</span>
          {user.lastName ? user.lastName : '💥'}
        </p>

        <p className="userData__paragraph">
          <span>Country:</span>
          {user.country ? user.country : '💥'}
        </p>

        <p className="userData__paragraph">
          <span>City:</span>
          {user.city ? user.city : '💥'}
        </p>

        <p className="userData__paragraph">
          <span>Phone:</span>
          {user.phone ? user.phone : '💥'}
        </p>

        <p className="userData__paragraph">
          <span>Email:</span>
          {user.email ? user.email : '💥'}
        </p>
      </div>
    </div>
  );
}

export default UserData;
