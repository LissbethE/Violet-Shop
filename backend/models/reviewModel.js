import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    comment: {
      type: String,
      require: true,
    },

    rating: {
      type: Number,

      require: true,
      default: 0,

      min: [1, '📈 Rating must be above 1'],
      max: [10, '📉 Rating must be below 10'],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },

    // -
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      require: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
