import CartList from '../features/cart/CartList';
import CartSummury from '../features/cart/CartSummury';
import Button from '../ui/Button';

function Cart() {
  return (
    <section className="section-padding-small">
      <h2 className="heading-2 u-margin-bottom-medium">🛍️ Shopping Cart</h2>

      <div className="container-x2">
        <CartList />
        <CartSummury>
          <Button type="white" to="/shipping">
            Proceed To Checkout
          </Button>
        </CartSummury>
      </div>
    </section>
  );
}

export default Cart;
