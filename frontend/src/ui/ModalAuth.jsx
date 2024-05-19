import Authentication from '../features/authentication/Authentication';
import Button from './Button';
import Modal from './Modal';

function ModalAuth() {
  return (
    <Modal>
      <Modal.Open opens="login">
        <Button type="primarySmall">Login</Button>
      </Modal.Open>

      <Modal.Window name="login">
        <Authentication />
      </Modal.Window>
    </Modal>
  );
}

export default ModalAuth;
