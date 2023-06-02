import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../db/dbConnect';
import { Product } from '../../../db/models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  // Connect to the database
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        // Find a product by ID
        const product = await Product.findById(id);
        if (!product) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        // Update a product by ID with the provided request body
        const product = await Product.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!product) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        // Delete a product by ID
        const deletedProduct = await Product.deleteOne({ _id: id });
        if (deletedProduct.deletedCount === 0) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      // Return a 400 status code for unsupported HTTP methods
      res.status(400).json({ success: false });
      break;
  }
}
