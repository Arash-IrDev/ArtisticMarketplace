import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../db/dbConnect';
import { Product } from '../../../../db/models/Product';
import products from '../../../../db/products-data.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const product = await Product.insertMany(products);
                res.status(201).json({ success: true, data: product });
            } catch (error) {
                res.status(400).json({ success: false, error: (error as Error).message });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}