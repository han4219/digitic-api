import { Request, Response } from 'express'
import Product from '../../models/Product'

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const foundProduct = await Product.findById(id)

    if (!foundProduct) {
      return res.status(404).json({
        message: 'Product not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: foundProduct,
    })
  } catch (error: any) {
    return res.status(400).json({
      message: `Something went wrong! ${error.message || ''}`,
    })
  }
}
