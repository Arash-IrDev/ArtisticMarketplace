import mongoose from 'mongoose';

// Define the schema for the Product collection
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

// Create a model based on the Product schema
export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
