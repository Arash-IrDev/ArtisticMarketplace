import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../db/dbConnect';
import { Product } from '../../../../db/models/Product';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        method,
    } = req;

    await dbConnect();

    switch (method) {
        case 'DELETE':
            try {
                const deletedProduct = await Product.deleteMany();
                if (deletedProduct.deletedCount === 0) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
