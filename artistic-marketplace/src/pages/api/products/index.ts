import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../db/dbConnect';
import { Product } from '../../../db/models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find({});

        const categories = [...new Set(products.flatMap(p => p.category))];

        // Calculate price ranges
        const prices = products.map(p => p.price);
        const maxPrice = Math.max(...prices);
        const priceRanges = [
          { range: 'Lower than $20', min: 0, max: 20 },
          { range: '$20 - $100', min: 20, max: 100 },
          { range: '$100 - $200', min: 100, max: 200 },
          { range: 'More than $200', min: 200, max: maxPrice },
        ];

        res.status(200).json({ success: true, data: { products, categories, priceRanges } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
      } catch (error) {
        console.error('Error creating product:', error);
        res.status(400).json({ success: false, error: (error as Error).message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}