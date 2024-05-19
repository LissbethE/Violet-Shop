import ProductList from '../features/product/ProductList';
import Pagination from '../ui/Pagination';

function AllProducts() {
  return (
    <section className="section-padding-small">
      <h1 className="heading-1 heading-1--allProd">Our Products</h1>

      <ProductList />

      <Pagination />
    </section>
  );
}

export default AllProducts;
