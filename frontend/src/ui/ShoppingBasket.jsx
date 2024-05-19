import { useSelector } from 'react-redux';
import BtnHover from './BtnHover';

function ShoppingBasket() {
  const { results } = useSelector((state) => state.cart);

  console.log();

  return (
    <BtnHover
      type="button"
      className="btnHover"
      to={results === 0 ? false : '/cart'}
    >
      {results > 0 && <p className="results">{results}</p>}

      <svg className="btnHover__icon">
        <use xlinkHref="/img/sprite.svg#icon-shopping-basket"></use>
      </svg>
    </BtnHover>
  );
}

export default ShoppingBasket;
