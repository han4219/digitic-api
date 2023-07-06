import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'
import Blog from '../../models/Blog'
import { isValidObjectId } from '../../utils/helper'

export const dislikeBlog = async (
  req: Request | HavingIdentity,
  res: Response
) => {
  const { blogId } = (req as Request).body

  if (!isValidObjectId(blogId)) {
    return res.status(400).json({
      message: 'The ID is invalid or not found.',
    })
  }

  const loggedInUser = (req as HavingIdentity).user

  try {
    const blog = await Blog.findById(blogId)

    if (!blog) {
      return res.status(404).json({
        message: 'Blog not found.',
      })
    }

    const alreadyLiked = blog.likes.find(
      (id) => id.toString() === loggedInUser.id
    )

    const alreadyDisliked = blog.dislikes.find(
      (id) => id.toString() === loggedInUser.id
    )

    if (alreadyLiked) {
      await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loggedInUser._id },
          isLiked: false,
        },
        { new: true }
      )
    }

    if (alreadyDisliked) {
      const updatedDislikeBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loggedInUser._id },
          isDisliked: false,
        },
        { new: true }
      )

      return res.status(200).json({
        message: 'Success',
        data: updatedDislikeBlog,
      })
    } else {
      const updatedDislikeBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: loggedInUser._id },
          isDisliked: true,
        },
        { new: true }
      )

      return res.status(200).json({
        message: 'Success',
        data: updatedDislikeBlog,
      })
    }
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
