import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'
import Blog from '../../models/Blog'
import { isValidObjectId } from '../../utils/helper'

export const likeBlog = async (
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
      (userId) => userId.toString() === loggedInUser._id.toString()
    )
    const alreadyDisliked = blog.dislikes.find(
      (userId) => userId.toString() === loggedInUser._id.toString()
    )

    if (alreadyDisliked) {
      await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loggedInUser._id },
          isDisliked: false,
        },
        { new: true }
      )
    }

    if (alreadyLiked) {
      const updatedUnLikeBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loggedInUser._id },
          isLiked: false,
        },
        { new: true }
      )

      return res.status(200).json({
        message: 'Success',
        data: updatedUnLikeBlog,
      })
    } else {
      const updatedLikeBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loggedInUser._id },
          isLiked: true,
        },
        { new: true }
      )

      return res.status(200).json({
        message: 'Success',
        data: updatedLikeBlog,
      })
    }
  } catch (error: any) {
    console.log(error, 'error')
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
