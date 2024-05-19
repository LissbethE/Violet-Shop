import { useDispatch, useSelector } from 'react-redux';
import { useProduct } from './useProduct';
import { useState } from 'react';

import SpinnerHeart from '../../ui/SpinnerHeart';
import BtnHover from '../../ui/BtnHover';
import Button from '../../ui/Button';

import { formatCurrency } from '../../utils/helpers';

import {
  addItem,
  changeSizeItem,
  deleteItem,
  getCurrentQuantityById,
  getTotalCartPrice,
} from '../cart/cartSlice';

import UpdateItemQuantity from '../cart/UpdateItemQuantity';
import ErrorMessage from '../../ui/ErrorMessage';

////////////////////////////

function ProductFeature({ productID, onCloseModal }) {
  const { product, isLoading, error } = useProduct(productID);
  const [sizes, setSizes] = useState('');
  const dispatch = useDispatch();

  const {
    _id: productId,
    name,
    image,
    rating,
    numReviews,
    description,
    size,
    price,
    discount,
    countInStock,
  } = product || {};

  ////////////////////////////

  const totalCartPrice = useSelector(getTotalCartPrice);
  const currentQuantity = useSelector(getCurrentQuantityById(productId));

  const isInCart = currentQuantity > 0;
  const totalPrice = isInCart ? totalCartPrice : price;
  const priceWithDiscount =
    totalPrice - Math.ceil((discount / 100) * totalPrice);

  ////////////////////////////

  function handleAddToCart() {
    const newProduct = {
      productId,
      name,
      image,
      size: sizes,
      price,
      quantity: 1,
      totalPrice: price * 1,
      priceWithDiscount,
      countInStock,
    };

    dispatch(addItem(newProduct));
  }

  ////////////////////////////

  if (isLoading) return <SpinnerHeart />;
  if (error) return <ErrorMessage>💥Product not found</ErrorMessage>;

  ////////////////////////////

  return (
    <section
      className={`prodFeature ${
        onCloseModal ? 'prodFeature--modal' : 'regular'
      }`}
    >
      <div className="prodFeature__box-img">
        <img src={`/img/${product.image}`} className="prodFeature__img" />
      </div>

      <div className="prodFeature__content">
        <h2 className="heading-2 heading-2--prodFeature u-margin-bottom-small">
          {name}
        </h2>

        <div className="prodFeature__box-prices u-margin-bottom-medium">
          <div className="prodFeature__prices">
            {discount ? (
              <>
                <h3 className="heading-3">Price:</h3>

                <p className="prodFeature__priceWithDiscount">
                  {formatCurrency(priceWithDiscount)}
                </p>

                <p className="prodFeature__previousPrice">
                  {formatCurrency(totalPrice)}
                </p>

                <p className="prodFeature__discount"> -{discount}%</p>
              </>
            ) : (
              <p className="prodFeature__price">
                Price: {formatCurrency(totalPrice)}
              </p>
            )}
          </div>

          <div className="prodFeature__info">
            <p className="prodFeature__rating">⭐ {rating} / 10</p>
            <p className="prodFeature__reviews">{numReviews} Reviews</p>
          </div>
        </div>

        <p className="paragraph u-margin-bottom-small-2">{description}</p>

        <div className="prodFeature__Availability u-margin-bottom-small">
          <h3 className="heading-3">Availability:</h3>

          <p className="paragraph paragraph--medium">
            {countInStock > 0 ? `${countInStock} in stock` : `Out of stock`}
          </p>
        </div>

        <div className="prodFeature__container">
          {isInCart ? (
            <div className="prodFeature__btns">
              <Button
                type="dark"
                onClick={() => {
                  dispatch(deleteItem(productId));
                  setSizes('');
                }}
              >
                Delete
              </Button>
            </div>
          ) : countInStock !== 0 ? (
            <Button
              type="primary"
              onClick={handleAddToCart}
              disabled={countInStock === 0}
            >
              Add to cart
            </Button>
          ) : (
            ''
          )}

          {isInCart && (
            <div className="prodFeature__box">
              <div className="prodFeature__sizes">
                <h3 className="heading-3">Size:</h3>

                <div>
                  {size?.map((size) => (
                    <BtnHover
                      key={size}
                      active={size === sizes}
                      onClick={() => {
                        setSizes(size);
                        dispatch(changeSizeItem(productId, size));
                      }}
                    >
                      <p className="paragraph">{size}</p>
                    </BtnHover>
                  ))}
                </div>
              </div>

              <div className="prodFeature__quantity">
                <h3 className="heading-3">Quantity:</h3>

                <UpdateItemQuantity
                  productId={productId}
                  currentQuantity={currentQuantity}
                  countInStock={countInStock}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductFeature;
