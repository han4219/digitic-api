import { Request, Response } from 'express'
import ProductCategory from '../../models/ProductCategory'

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const foundCategory = await ProductCategory.findById(id)

    if (!foundCategory) {
      return res.status(404).json({
        message: 'Category not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: foundCategory,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
