import { Request, Response } from 'express'
import ProductCategory from '../../models/ProductCategory'

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deletedCategory = await ProductCategory.findByIdAndDelete(id)

    if (!deletedCategory) {
      return res.status(404).json({
        message: 'Category not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: deletedCategory,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
