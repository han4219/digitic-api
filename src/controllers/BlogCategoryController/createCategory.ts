import { Request, Response } from 'express'
import BlogCategory from '../../models/BlogCategory'

export const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await BlogCategory.create(req.body)

    return res.status(201).json({
      message: 'Blog category created successfully.',
      data: newCategory,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
