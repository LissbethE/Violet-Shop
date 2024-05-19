import toast from 'react-hot-toast';
import SpinnerHeart from '../../../ui/SpinnerHeart';
import { useSearchParams } from 'react-router-dom';

import Modal from '../../../ui/Modal';
import Button from '../../../ui/Button';
import BtnHover from '../../../ui/BtnHover';
import UpdateUser from './UpdateUser';

import { useUser } from './useUsers';
import { useDeleteUser } from './useDeleteUser';

function UserTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { users, isLoading } = useUser();
  const { isDeleting, deleteUser } = useDeleteUser();

  if (isLoading || isDeleting) return <SpinnerHeart />;
  //if (error) return <p>No hay prod</p>;

  const { user } = users.data;

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        deleteUser(id);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <section className="adminProducts section-padding-small">
      <section className="table-header u-margin-bottom-medium">
        <div>
          <h1 className="heading-1 heading-1--table">Users</h1>
          <p className="paragraph">Results: {user.length}</p>
        </div>
      </section>

      <section className="table-body">
        <table className="table">
          <thead className="table__thead">
            <tr className="table__row">
              <th>Id</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody className="table__tbody">
            {user?.map((user) => (
              <tr key={user._id} className="table__row">
                <td>{user._id}</td>
                <td className="ele-center">
                  <div className="userPhoto-small">
                    <img
                      src={`/img/${user.image}`}
                      className="userPhoto-small__photo"
                    />
                  </div>
                </td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.role}</td>

                <td>
                  <Modal>
                    <Modal.Open opens="productUpdate">
                      <div>
                        <BtnHover
                          onClick={() => {
                            searchParams.set('userId', user._id);
                            setSearchParams(searchParams);
                          }}
                        >
                          <svg className="btnHover__icon">
                            <use xlinkHref="/img/sprite.svg#icon-new-message"></use>
                          </svg>
                        </BtnHover>
                      </div>
                    </Modal.Open>

                    <Modal.Window name="productUpdate">
                      <UpdateUser />
                    </Modal.Window>
                  </Modal>
                </td>

                <td>
                  {user.role === 'user' && (
                    <Button
                      type="dark"
                      onClick={() => deleteHandler(user._id)}
                      disabled={isDeleting}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default UserTable;
