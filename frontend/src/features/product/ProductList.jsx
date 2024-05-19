import ErrorMessage from '../../ui/ErrorMessage';
import SpinnerHeart from '../../ui/SpinnerHeart';
import ProductItem from './ProductItem';

import { useProducts } from './useProducts';

function ProductList({ ColumnCount }) {
  const { products, isLoading, results } = useProducts();

  //////////////////////////

  if (isLoading) return <SpinnerHeart />;
  if (!results) return <ErrorMessage>💥Product not found</ErrorMessage>;

  //////////////////////////

  if (ColumnCount) {
    const littleProducts = products.filter(
      (_, index) => index + 1 <= ColumnCount
    );

    return (
      <ul className="products__list">
        {littleProducts?.map((product) => (
          <ProductItem product={product} key={product._id} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="products__list">
      {products?.map((product) => (
        <ProductItem product={product} key={product._id} />
      ))}
    </ul>
  );
}

export default ProductList;
