import { Request, Response } from 'express'
import Blog from '../../models/Blog'

export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id)

    if (!deletedBlog) {
      return res.status(404).json({
        message: 'Blog not found.',
      })
    }

    return res.status(200).json({
      message: 'Blog deleted successfully.',
      data: deletedBlog,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
