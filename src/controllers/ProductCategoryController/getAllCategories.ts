import { Request, Response } from 'express'
import ProductCategory from '../../models/ProductCategory'

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await ProductCategory.find({})

    return res.status(200).json({
      message: 'Success',
      data: {
        productCategories: categories,
      },
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
