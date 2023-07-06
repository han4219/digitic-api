import { Request, Response } from 'express'
import Blog from '../../models/Blog'

export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    if (!updatedBlog) {
      return res.status(404).json({
        message: 'Blog not found.',
      })
    }

    return res.status(200).json({
      message: 'Blog updated successfully.',
      data: updatedBlog,
    })
  } catch (error: any) {
    return res.status(400).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
