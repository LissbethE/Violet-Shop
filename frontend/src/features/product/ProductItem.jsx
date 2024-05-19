import { Link } from 'react-router-dom';

import BtnHover from '../../ui/BtnHover';
import { formatCurrency } from '../../utils/helpers';
import Modal from '../../ui/Modal';
import ProductFeature from './ProductFeature';

// feature

function ProductItem({ product, productCategory }) {
  const { _id: productId, name, image, price, discount } = product || {};

  if (productCategory) {
    return (
      <li className="products__item products__item--category">
        <div className="products__content">
          <Link to={`/product/${productId}`} className="products__link">
            <div className="containerImage u-margin-bottom-small">
              <img src={`/img/${image}`} className="containerImage__img" />
            </div>

            <h4 className="products__title heading-4">{name}</h4>
          </Link>
        </div>
      </li>
    );
  }

  return (
    <li className="products__item">
      <div className="products__content">
        <Link to={`/product/${productId}`} className="products__link">
          <div className="containerImage  u-margin-bottom-small">
            <img src={`/img/${image}`} className="containerImage__img" />
          </div>

          <h4 className="products__title heading-4">{name}</h4>
        </Link>

        <div className="products__box">
          <p
            className={`products__price ${
              discount !== 0 ? 'products__price--discount' : ''
            }`}
          >
            <span>Price:</span> <span>{formatCurrency(price)}</span>
          </p>

          {discount !== 0 && (
            <p className="products__discount"> -{discount}%</p>
          )}

          <Modal>
            <Modal.Open opens="product-details">
              <BtnHover>
                <svg className="btnHover__icon btnHover__icon--product products__icon">
                  <use xlinkHref="/img/sprite.svg#icon-shopping-basket"></use>
                </svg>
              </BtnHover>
            </Modal.Open>

            <Modal.Window name="product-details">
              <ProductFeature productID={productId} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </li>
  );
}

/* <StarRating
          size={20}
          defaultRating={product.rating}
          fixedRating={true}
        /> */

/*

     <button onClick={handleAddToCart}>Add to cart</button>

      <button onClick={() => dispath(deleteItem(product?._id))}>
        Eliminar
      </button>

      <button onClick={() => dispath(increaseItemQuantity(product?._id))}>
        mas producto{' '}
      </button>

      <button onClick={() => dispath(decreaseItemQuantity(product?._id))}>
        Menos producto{' '}
      </button>

      <button onClick={() => dispath(clearCart())}>
        Borrar todo los producto{' '}
      </button>
      */

export default ProductItem;
