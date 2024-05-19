import { useState } from 'react';
import { Link } from 'react-router-dom';

import Promo from './Promo';
import Logo from './Logo';
import DarkModeToggle from './DarkModeToggle';
import ShoppingBasket from './ShoppingBasket';
import Search from './Search';
import BtnHover from './BtnHover';
import ProductCategories from '../features/product/ProductCategories';
import HeaderMenu from './HeaderMenu';

function Nav() {
  const [showCategory, setShowCategory] = useState(false);

  return (
    <>
      <Promo />

      <nav className="nav u-margin-bottom-small">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/" className="nav__link hover-link">
              Home
            </Link>
          </li>

          <li className="nav__item">
            <BtnHover
              onClick={() => setShowCategory((show) => !show)}
              active={showCategory}
            >
              <p>Categories</p>

              <svg
                className={`btnHover__icon ${
                  showCategory ? 'btnHover__icon--rotate180' : ''
                }`}
              >
                <use xlinkHref="/img/sprite.svg#icon-chevron-small-down"></use>
              </svg>
            </BtnHover>
          </li>

          <li className="nav__item">
            <BtnHover to="/product">Products</BtnHover>
          </li>

          <li className="nav__item ">
            <a href="#" className="nav__link hover-link">
              Contact Us
            </a>
          </li>
        </ul>

        <Logo />

        <div className="nav__box">
          <Search />
          <ShoppingBasket />
          <DarkModeToggle />

          <HeaderMenu />
        </div>

        {showCategory && <ProductCategories />}
      </nav>
    </>
  );
}

/*

  <a href="#" className="nav__link hover-link">
              Our History
            </a>
            */

export default Nav;
