import mongoose from 'mongoose';
import slugify from 'slugify';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },

    name: {
      type: String,
      require: true,
    },

    slug: String,

    image: {
      type: String,
      default: 'sample.jpg',
    },

    description: {
      type: String,
      require: true,
    },

    category: {
      type: String,
      require: true,
    },

    size: {
      type: [String],
      require: true,
    },

    price: {
      type: Number,
      require: true,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,

      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: '💵 Discount Price ({VALUE}) should be below regular price',
      },
    },

    countInStock: {
      type: Number,
      require: true,
      default: 0,
    },

    reviews: [reviewSchema],

    numReviews: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,

      min: [1, '📈 Rating must be above 1'],
      max: [10, '📉 Rating must be below 10'],
    },
  },
  {
    timestamps: true,
  }
);

////////////////////////////////

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: '_id name role image' });

  next();
});

////////////////////////////////

const Product = mongoose.model('Product', productSchema);

export default Product;
