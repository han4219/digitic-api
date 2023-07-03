import { Request, Response } from 'express'
import Product from '../../models/Product'

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await Product.find({})

    return res.status(200).json({
      message: 'Success',
      data: allProducts,
    })
  } catch (error: any) {
    return res.status(400).json({
      message: `Something went wrong! ${error.message || ''}`,
    })
  }
}
