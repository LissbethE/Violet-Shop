import { useSelector } from 'react-redux';
import BtnHover from '../../ui/BtnHover';
import Modal from '../../ui/Modal';
import EditShippingAddress from './EditShippingAddress';

function ShippingAddress() {
  const { shippingAddress } = useSelector((state) => state.shippingAddress);

  return (
    <div className="userAddress">
      <div className="userAddress__box-title u-margin-bottom-medium ">
        <h3 className="heading-3 heading-3--userData">Shipping Address</h3>

        <Modal>
          <Modal.Open opens="userAddress">
            <BtnHover>
              <svg className="userAddress__icon">
                <use xlinkHref="/img/sprite.svg#icon-new-message"></use>
              </svg>
            </BtnHover>
          </Modal.Open>

          <Modal.Window name="userAddress">
            <EditShippingAddress />
          </Modal.Window>
        </Modal>
      </div>

      <div className="userAddress__content">
        <p className="userAddress__paragraph">
          <span>Country:</span>
          {shippingAddress.country}
        </p>

        <p className="userAddress__paragraph">
          <span>City:</span>
          {shippingAddress.city}
        </p>

        <p className="userAddress__paragraph">
          <span>Address:</span>
          {shippingAddress.address}
        </p>

        <p className="userAddress__paragraph">
          <span>Postal Code:</span>
          {shippingAddress.postalCode}
        </p>
      </div>
    </div>
  );
}

export default ShippingAddress;
