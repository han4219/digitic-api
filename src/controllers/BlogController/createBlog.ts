import { Request, Response } from 'express'
import Blog from '../../models/Blog'

export const createBlog = async (req: Request, res: Response) => {
  try {
    const createdBlog = await Blog.create(req.body)

    return res.status(201).json({
      message: 'Success',
      data: createdBlog,
    })
  } catch (error: any) {
    return res.status(400).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
