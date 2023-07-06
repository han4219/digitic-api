import { Request, Response } from 'express'
import ProductCategory from '../../models/ProductCategory'

export const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await ProductCategory.create(req.body)

    return res.status(201).json({
      message: 'ProductCategory created successfully.',
      data: newCategory,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
