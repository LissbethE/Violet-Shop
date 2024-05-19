import Product from '../models/productModel.js';
import { ApiFeatures } from '../utils/ApiFeatures.js';
import asyncHandler from '../utils/asyncHandler.js';

//* Get all product
// @route GET /api/v1/products
// @access Public
export const getAllProducts = asyncHandler(async (req, res) => {
  let filter = {};
  if (req.params.productId) filter = { product: req.params.productId };

  // Execute Query
  const features = new ApiFeatures(Product.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;
  const countProducts = await Product.countDocuments();

  // Send Response
  res.status(200).json({
    status: 'success',
    limit: 8,
    countProducts,
    results: doc.length,
    data: doc,
  });

  /*
  // SEARCH
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  // PAGINATING
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({ ...keyword });

  const data = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // Send Response
  res.status(200).json({
    status: 'success',
    page,
    pages: Math.ceil(count / pageSize),
    count: pageSize,
    results: count,
    data,
  });
  */
});

//* Get single product
// @route GET /api/v1/products/:id
// @access Public
export const getProduct = asyncHandler(async (req, res) => {
  const data = await Product.findById(req.params.id);

  if (!data) {
    res.status(404);

    throw new Error(
      '💥Sorry, but we could not find any data associated with the given ID'
    );
  }

  // Send Response
  res.status(200).json({
    status: 'success',
    data,
  });
});

//////////////////////////
// A D M I N

//* Create new product
// @route   POST /api/v1/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: 'Sample name',
    image: 'sample.jpg',
    description: 'sample description',
    category: 'sample category',
    size: ['Sample size'],
  });

  const data = await product
    .save({ validateBeforeSave: false })
    .catch((err) => console.log(err));

  if (!data) {
    res.status(404);
    throw new Error('💥Invalid data sent!');
  }

  // Send Response
  res.status(200).json({
    status: 'success',
    data,
  });
});

//* Update product
// @route   PATCH /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, discount, description, category, size, countInStock } =
    req.body;

  const updateProduct = {
    name,
    price,
    discount,
    description,
    category,
    size,
    countInStock,
  };

  const options = { new: true };
  const data = await Product.findByIdAndUpdate(
    req.params.id,
    updateProduct,
    options
  ).catch((err) => console.log(err));

  if (!data) {
    res.status(404);
    throw new Error('💥Product not found');
  }

  // Send Response 🛩️
  res.status(200).json({
    status: 'success',
    data,
  });
});

//* Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const data = await Product.findByIdAndDelete(req.params.id);

  if (!data) {
    res.status(404);
    throw new Error('💥Product not found');
  }

  // Send Response 🛩️
  res.status(200).json({
    status: 'success',
    message: 'Product deleted successfully',
    data: null,
  });
});

//////////////////////////
// R E V I E W

//* Create a new review
// @route POST /api/v1/products/:id/reviews
// @access Private
export const createdProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      image: req.user.image,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product
      .save({ validateBeforeSave: false })
      .catch((err) => console.log(err));

    // Send Response
    res.status(201).json({
      status: 'success',
      message: 'Review added',
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
