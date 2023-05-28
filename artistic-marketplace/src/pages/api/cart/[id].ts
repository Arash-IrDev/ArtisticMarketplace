import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../db/dbConnect';
import { Cart } from '../../../db/models/Cart';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const cart = await Cart.findById(id);
        if (!cart) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: cart });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const cart = await Cart.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!cart) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: cart });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedCart = await Cart.deleteOne({ _id: id });
        if (!deletedCart) {
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
