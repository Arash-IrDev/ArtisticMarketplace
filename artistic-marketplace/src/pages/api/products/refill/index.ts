import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../db/dbConnect';
import { Product } from '../../../../db/models/Product';
import products from '../../../../db/products-data.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    // Connect to the database
    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                // Delete all existing products
                const deletedProduct = await Product.deleteMany();
                if (deletedProduct.deletedCount === 0) {
                    return res.status(400).json({ success: false });
                }

                // Insert new products from the data file
                const product = await Product.insertMany(products);
                res.status(201).json({ success: true, data: product });
            } catch (error) {
                res.status(400).json({ success: false, error: (error as Error).message });
            }
            break;
        default:
            // Return a 400 status code for unsupported HTTP methods
            res.status(400).json({ success: false });
            break;
    }
}
