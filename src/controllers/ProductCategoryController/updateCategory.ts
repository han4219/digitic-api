import { Request, Response } from 'express'
import ProductCategory from '../../models/ProductCategory'

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const updatedCategory = await ProductCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )

    if (!updatedCategory) {
      return res.status(404).json({
        message: 'Category not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: updatedCategory,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
