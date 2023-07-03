import { Request, Response } from 'express'
import Product from '../../models/Product'

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      return res.status(404).json({
        message: 'Product not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: deletedProduct,
    })
  } catch (error: any) {
    return res.status(400).json({
      message: `Something went wrong! ${error.message || ''}`,
    })
  }
}
