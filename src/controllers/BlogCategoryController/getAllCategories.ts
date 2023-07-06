import { Request, Response } from 'express'
import BlogCategory from '../../models/BlogCategory'

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await BlogCategory.find({})

    return res.status(200).json({
      message: 'Success',
      data: {
        blogCategories: categories,
      },
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
