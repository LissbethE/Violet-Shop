import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useProduct } from '../useProduct';
import SpinnerHeart from '../../../ui/SpinnerHeart';
import FormRow from '../../../ui/FormRow';
import { useUpdateProduct } from './useUpdateProduct';
import Button from '../../../ui/Button';
import { useUploadProductImage } from './useUploadProductImage';

function ProductUpdate() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId') || '';

  const { uploadProductImage, isUpdatingImage } = useUploadProductImage();
  const { updateProduct, isUpdating } = useUpdateProduct();
  const { product, isLoading, error } = useProduct(productId);

  ////////////////////////////
  // Form

  const { register, formState, handleSubmit } = useForm();

  const { errors } = formState;

  function onSubmit({ ...value }) {
    const prevProduct = Object.values(product);
    const values = Object.entries(value);
    let entries = [];

    const currentProduct = Object.values(value).filter((ele, i) => {
      const text = ele !== '';
      const dif = ele !== prevProduct[i] ? (text ? ele : '') : '';

      return dif;
    });

    for (let [key, valor] of values) {
      if (currentProduct.includes(valor)) entries.push([key, valor]);
    }

    const data = Object.fromEntries(entries);

    if (data?.size && data?.size !== undefined) {
      const sizeArray = data?.size?.includes(',')
        ? data.size?.split(',')
        : data.size?.split(' ');

      data.size = sizeArray;
    }

    updateProduct({ productId, data });
    // close();
  }

  function onSubmitImage(value) {
    if (value?.image[0]?.name === undefined) return;

    const data = value.image[0];

    uploadProductImage({ productId, data });

    /* if (value?.image[0]?.name !== undefined || value?.image[0]?.name !== '') {
        const data = new FormData();
      data.append('image', value);

      // const data = { image: value?.image[0]?.name };
      updateProduct({ productId, data });
    }*/
  }

  ////////////////////////////

  if (isLoading || isUpdating || isUpdatingImage) return <SpinnerHeart />;
  if (error) return <p>Product not found</p>;

  ////////////////////////////

  return (
    <section className="productUpdate">
      <section className="u-margin-bottom-medium">
        <h1 className="u-margin-bottom-medium heading-1 heading-1--shipping">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <FormRow label="Name" error={errors?.name?.message}>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              disabled={isUpdating}
              {...register('name', {
                //required: 'This field is required',
              })}
            />
          </FormRow>

          <FormRow
            label="Category (sweater, pant, shoe, bag, hat, shirt)"
            error={errors?.category?.message}
          >
            <input
              type="text"
              id="category"
              placeholder="Enter category"
              disabled={isUpdating}
              {...register('category', {
                //required: 'This field is required',
              })}
            />
          </FormRow>

          <FormRow label="Description" error={errors?.description?.message}>
            <input
              type="text"
              id="description"
              placeholder="Enter description"
              disabled={isUpdating}
              {...register('description', {
                //required: 'This field is required',
              })}
            />
          </FormRow>

          <FormRow
            label="Size (Please list the sizes you want, separated by commas. ej: m, s )"
            error={errors?.size?.message}
          >
            <input
              type="text"
              id="size"
              placeholder="Enter size"
              disabled={isUpdating}
              {...register('size', {
                //required: 'This field is required',
              })}
            />
          </FormRow>

          <FormRow label="Price" error={errors?.price?.message}>
            <input
              type="number"
              id="price"
              placeholder="Enter price"
              disabled={isUpdating}
              {...register('price', {
                //required: 'This field is required',
              })}
            />
          </FormRow>

          <FormRow label="Discount" error={errors?.discount?.message}>
            <input
              type="number"
              id="discount"
              placeholder="Enter discount"
              disabled={isUpdating}
              {...register('discount', {
                //required: 'This field is required',
              })}
            />
          </FormRow>

          <FormRow label="Count In Stock" error={errors?.countInStock?.message}>
            <input
              type="number"
              id="countInStock"
              placeholder="Enter countInStock"
              disabled={isUpdating}
              {...register('countInStock', {
                //required: 'This field is required',
              })}
            />
          </FormRow>

          <FormRow>
            <Button type="primary" disabled={isUpdating}>
              Improving the product
            </Button>
          </FormRow>
        </form>
      </section>

      <section className="border-top">
        <h1 className="u-margin-bottom-medium heading-1 heading-1--shipping">
          Edit Image
        </h1>

        <form onSubmit={handleSubmit(onSubmitImage)} className="form">
          <FormRow label="image" error={errors?.image?.message}>
            <input
              type="file"
              id="image"
              accept="image/*"
              placeholder="Choose File"
              className="inputFile"
              disabled={isUpdating}
              {...register('image')}
            />
          </FormRow>

          <FormRow>
            <Button type="primary" disabled={isUpdatingImage}>
              Save Picture
            </Button>
          </FormRow>
        </form>
      </section>
    </section>
  );
}

/*
  name,
    image,
    price,
    discount,
    description,
    category,
    size,
    countInStock, */

/* const sizeArray = update.size.includes(',')
      ? update.size.split(',')
      : update.size.split(' ');*/

/*
      
       <form onSubmit={handleSubmit(onSubmit)} className="form">
        <FormRow label="Name" error={errors?.name?.message}>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            disabled={isUpdating}
            {...register('name', {
              //required: 'This field is required',
            })}
          />
        </FormRow>

        <FormRow
          label="Category (sweater, pant, shoe, bag, hat, shirt)"
          error={errors?.category?.message}
        >
          <input
            type="text"
            id="category"
            placeholder="Enter category"
            disabled={isUpdating}
            {...register('category', {
              //required: 'This field is required',
            })}
          />
        </FormRow>

        <FormRow label="Description" error={errors?.description?.message}>
          <input
            type="text"
            id="description"
            placeholder="Enter description"
            disabled={isUpdating}
            {...register('description', {
              //required: 'This field is required',
            })}
          />
        </FormRow>

        <FormRow
          label="Size (Please list the sizes you want, separated by commas. ej: m, s )"
          error={errors?.size?.message}
        >
          <input
            type="text"
            id="size"
            placeholder="Enter size"
            disabled={isUpdating}
            {...register('size', {
              //required: 'This field is required',
            })}
          />
        </FormRow>

        <FormRow label="Price" error={errors?.price?.message}>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            disabled={isUpdating}
            {...register('price', {
              //required: 'This field is required',
            })}
          />
        </FormRow>

        <FormRow label="Discount" error={errors?.discount?.message}>
          <input
            type="number"
            id="discount"
            placeholder="Enter discount"
            disabled={isUpdating}
            {...register('discount', {
              //required: 'This field is required',
            })}
          />
        </FormRow>

        <FormRow label="Count In Stock" error={errors?.countInStock?.message}>
          <input
            type="number"
            id="countInStock"
            placeholder="Enter countInStock"
            disabled={isUpdating}
            {...register('countInStock', {
              //required: 'This field is required',
            })}
          />
        </FormRow>

        <FormRow>
          <Button type="primary" disabled={isUpdating}>
            Improving the product
          </Button>
        </FormRow>
      </form>*/

export default ProductUpdate;
