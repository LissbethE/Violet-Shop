////////////////////////////

import Button from '../../ui/Button';
import ProductList from './ProductList';

function Products() {
  return (
    <section className="products section-padding">
      <h2 className="heading-2 heading-2--products">Featured Products</h2>

      <ProductList ColumnCount={8} />

      <Button type="primary" to="/product">
        Explore all products
      </Button>
    </section>
  );
}

export default Products;
