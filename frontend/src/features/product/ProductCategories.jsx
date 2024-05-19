import { useEffect, useState } from 'react';

import BtnHover from '../../ui/BtnHover';
import ProductItem from './ProductItem';
import SpinnerHeart from '../../ui/SpinnerHeart';

import { useOneHundredProducts } from './useOneHundredProducts';

////////////////////////////

const options = [
  { value: 'all', label: 'All' },
  { value: 'sweater', label: 'Sweater' },
  { value: 'pant', label: 'Pant' },
  { value: 'shoe', label: 'Shoe' },
  { value: 'bag', label: 'Bag' },
  { value: 'hat', label: 'Hat' },
  { value: 'shirt', label: 'Shirt' },
];

////////////////////////////

function ProductCategories() {
  const { products, isLoading, error } = useOneHundredProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');

  ////////////////////////////

  useEffect(
    function () {
      setFilteredProducts(products);
    },
    [products]
  );

  ////////////////////////////

  // 1) FILTER
  function handleClick(value) {
    const filter = products.filter((product) =>
      value === 'all' ? product : product.category === value
    );

    setFilteredProducts(filter);
    setCurrentFilter(value);
  }

  ////////////////////////////

  if (isLoading) return <SpinnerHeart />;
  if (error) return <p>💥Error</p>;

  ////////////////////////////
  return (
    <section className="productCategories">
      <div className="productCategories__box">
        <ul className="productCategories__menu">
          {options?.map((option) => (
            <li key={option.value}>
              <BtnHover
                onClick={() => handleClick(option.value)}
                active={option.value === currentFilter}
                disabled={option.value === currentFilter}
              >
                <p>{option.label}</p>

                <svg className="btnHover__icon btnHover__icon--rotate90">
                  <use xlinkHref="/img/sprite.svg#icon-chevron-small-down"></use>
                </svg>
              </BtnHover>
            </li>
          ))}
        </ul>
      </div>

      <div className="productCategories__box">
        <ul className="products__list products__list--category">
          {filteredProducts?.map((product) => {
            return (
              <ProductItem
                key={product._id}
                product={product}
                productCategory={true}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/*
 <section className="productCategories">
      <div className="productCategories__box">
        <ul className="productCategories__menu">
          {categories?.map((category) => (
            <li key={category}>
              <BtnHover
                onClick={() => handleClick(category)}
                active={category === filteredProducts[0].category}
              >
                <p>{category[0].toUpperCase() + category.slice(1)}</p>

                <svg className="btnHover__icon btnHover__icon--rotate90">
                  <use xlinkHref="/img/sprite.svg#icon-chevron-small-down"></use>
                </svg>
              </BtnHover>
            </li>
          ))}
        </ul>
      </div>

      <div className="productCategories__box">
        <ul className="products__list products__list--category">
          {filteredProducts?.map((product) => {
            return (
              <ProductItem
                key={product._id}
                product={product}
                productCategory={true}
              />
            );
          })}
        </ul>
      </div>
    </section>
    
    */

export default ProductCategories;
