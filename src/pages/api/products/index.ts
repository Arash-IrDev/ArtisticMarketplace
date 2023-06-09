import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../db/dbConnect';
import { Product } from '../../../db/models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Connect to the database
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        // Retrieve all products from the database
        const products = await Product.find({});

        // Extract unique categories from the products
        const categories = [...new Set(products.flatMap(p => p.category))];

        // Calculate price ranges
        const prices = products.map(p => p.price);
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const rangeSize = Math.ceil((maxPrice - minPrice) / 4);
        const priceRanges = [];
        for (let i = 0; i < 4; i++) {
          let min = minPrice + i * rangeSize;
          let max = minPrice + (i + 1) * rangeSize;
          min = Number(min.toFixed(2));
          max = Number(max.toFixed(2));
          let range;
          if (i === 0) {
            range = `Lower than $${max}`;
          } else if (i === 3) {
            range = `More than $${min}`;
          } else {
            range = `$${min} - $${max}`;
          }
          priceRanges.push({ range, min, max });
        }

        // Return the products, categories, and price ranges as the response data
        res.status(200).json({ success: true, data: { products, categories, priceRanges } });
      } catch (error) {
        // Handle error if there's an issue fetching the data
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        // Create a new product using the request body
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
      } catch (error) {
        console.error('Error creating product:', error);
        res.status(400).json({ success: false, error: (error as Error).message });
      }
      break;

    default:
      // Return a 400 status code for unsupported HTTP methods
      res.status(400).json({ success: false });
      break;
  }
}
