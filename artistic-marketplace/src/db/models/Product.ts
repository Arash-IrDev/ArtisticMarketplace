import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  category: [String],
  price: Number,
  currency: String,
  image: {
    src: String,
    alt: String,
  },
  bestseller: Boolean,
  featured: Boolean,
  details: {
    dimensions: {
      width: Number,
      height: Number,
    },
    size: Number,
    description: String,
    recommendations: [String],
  },
});

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
