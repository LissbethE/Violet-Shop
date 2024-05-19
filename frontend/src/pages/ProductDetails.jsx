import ProductFeature from '../features/product/ProductFeature';
import ProductReview from '../features/product/reviews/ProductReview';

function ProductDetails() {
  return (
    <section className="details section-padding-small">
      <ProductFeature />
      <ProductReview />
    </section>
  );
}

export default ProductDetails;
