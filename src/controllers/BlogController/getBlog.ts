import { Request, Response } from 'express'
import Blog from '../../models/Blog'

export const getBlog = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const foundBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    ).populate(['likes', 'dislikes'])

    if (!foundBlog) {
      return res.status(404).json({
        message: 'Blog not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: foundBlog,
    })
  } catch (error: any) {
    return res.status(400).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
