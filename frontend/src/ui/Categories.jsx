import { Link } from 'react-router-dom';

function Categories() {
  return (
    <div className="categories">
      <div className="categories__link hover-link">
        <p>categories</p>

        <svg className="categories__icon categories__icon--categories">
          <use xlinkHref="/img/sprite.svg#icon-chevron-down" />
        </svg>
      </div>

      <ul className="categories__menu">
        <li>
          <Link to="/sweaters" className="categories__link">
            Sweaters
          </Link>
        </li>

        <li>
          <Link to="/shirts" className="categories__link">
            Shirts
          </Link>
        </li>

        <li>
          <Link to="/pants" className="categories__link">
            Pants
          </Link>
        </li>

        <li>
          <Link to="/shoes" className="categories__link">
            Shoes
          </Link>
        </li>

        <li>
          <Link to="/bags" className="categories__link">
            Bags
          </Link>
        </li>

        <li>
          <Link to="/hats" className="categories__link">
            Hats
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Categories;
