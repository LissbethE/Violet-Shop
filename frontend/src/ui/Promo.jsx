// import { IconName } from "react-icons/ci";

function Promo() {
  return (
    <div className="promo u-margin-bottom-small">
      <div className="promo__content">
        <p className="small-paragraph">
          <svg className="promo__icon">
            <use xlinkHref="/img/sprite.svg#icon-paper-plane" />
          </svg>
          <span className="promo__span">Free shipping on Sundays!</span>
        </p>

        <p className="small-paragraph">
          Free Shipping On Orders Over
          <span className="promo__price">$100!</span>
        </p>

        <p className="small-paragraph">
          <svg className="promo__icon">
            <use xlinkHref="/img/sprite.svg#icon-paper-plane" />
          </svg>
          <span className="promo__span">Free shipping on Sundays!</span>
        </p>

        <p className="small-paragraph">
          Free Shipping On Orders Over
          <span className="promo__price">$100!</span>
        </p>
      </div>
    </div>
  );
}

export default Promo;
