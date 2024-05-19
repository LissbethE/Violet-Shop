import toast from 'react-hot-toast';
import BtnHover from '../../../ui/BtnHover';
import Button from '../../../ui/Button';
import SpinnerHeart from '../../../ui/SpinnerHeart';
import { useProducts } from '../useProducts';
import { useCreateProduct } from './useCreateProduct';
import Modal from '../../../ui/Modal';
import ProductUpdate from './ProductUpdate';
import { useSearchParams } from 'react-router-dom';
import { formatCurrency } from '../../../utils/helpers';
import { useDeleteProduct } from './useDeleteProduct';
import Pagination from '../../../ui/Pagination';

function ProductTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, results, isLoading, error } = useProducts();
  const { createProduct, isCreating } = useCreateProduct();
  const { isDeleting, deleteProduct } = useDeleteProduct();

  if (isLoading || isCreating) return <SpinnerHeart />;
  if (error) return <p>No hay prod</p>;

  function createProductHandler() {
    try {
      if (window.confirm('Are you sure you want to create a new product?'))
        createProduct();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        deleteProduct(id);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <section className="adminProducts section-padding-small">
      <section className="table-header u-margin-bottom-medium">
        <div>
          <h1 className="heading-1 heading-1--table">Products</h1>
          <p className="paragraph">Results: {results}</p>
        </div>

        <Button
          type="primary"
          onClick={createProductHandler}
          disabled={isCreating}
        >
          Create new product
        </Button>
      </section>

      <section className="table-body">
        <table className="table">
          <thead className="table__thead">
            <tr className="table__row">
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Discount</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody className="table__tbody">
            {products?.map((product) => (
              <tr key={product._id} className="table__row">
                <td>{product._id}</td>
                <td>
                  <div className="containerImage containerImage--small">
                    <img
                      src={`/img/${product.image}`}
                      className="containerImage__img"
                    />
                  </div>
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{formatCurrency(product.price)}</td>
                <td>
                  {product.discount === 0
                    ? '-'
                    : formatCurrency(product.discount)}
                </td>

                <td>
                  <Modal>
                    <Modal.Open opens="productUpdate">
                      <div>
                        <BtnHover
                          onClick={() => {
                            searchParams.set('productId', product._id);
                            setSearchParams(searchParams);
                          }}
                        >
                          <svg className="btnHover__icon">
                            <use xlinkHref="/img/sprite.svg#icon-new-message"></use>
                          </svg>
                        </BtnHover>
                      </div>
                    </Modal.Open>

                    <Modal.Window name="productUpdate">
                      <ProductUpdate />
                    </Modal.Window>
                  </Modal>
                </td>

                <td>
                  <Button
                    type="dark"
                    onClick={() => deleteHandler(product._id)}
                    disabled={isDeleting}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Pagination />
    </section>
  );
}

/*
 <ul className="adminProducts__table">
        <div className="adminProducts__heading">
          <h3>Id</h3>
          <h3>Name</h3>
          <h3>Category</h3>
          <h3>Category</h3>
          <h3>Price</h3>
          <h3>Discount</h3>
        </div>

        {products?.map((product) => (
          <li key={product._id} className="adminProducts__rows">
            <p>{product._id}</p>
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>{product.price}</p>
            <p>{product.discount}</p>

            <BtnHover type="button" className="btnHover">
              <svg className="btnHover__icon">
                <use xlinkHref="/img/sprite.svg#icon-new-message"></use>
              </svg>
            </BtnHover>

            <Button type="dark">Delete</Button>
          </li>
        ))}
      </ul>
       */

export default ProductTable;
