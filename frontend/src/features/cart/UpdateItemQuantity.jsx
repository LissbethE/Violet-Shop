import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';
import { useProduct } from '../product/useProduct';

function UpdateItemQuantity({ productId, currentQuantity, countInStock }) {
  const dispatch = useDispatch();

  return (
    <div className="flex-center ">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(productId))}
      >
        -
      </Button>

      <h3 className="heading-3">{currentQuantity}</h3>

      <Button
        type="round"
        disabled={currentQuantity >= countInStock}
        onClick={() => dispatch(increaseItemQuantity(productId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
