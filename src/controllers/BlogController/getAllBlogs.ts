import { Request, Response } from 'express'
import Blog from '../../models/Blog'

export const getAllBlogs = async (req: Request, res: Response) => {
  const query = { ...req.query }
  console.log(query)

  const countBlogs = await Blog.countDocuments()
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 20
  const skip = (page - 1) * limit
  const totalPage = Math.round(countBlogs / limit) || 1

  let queryDocument = Blog.find({})
    .skip(skip)
    .limit(limit)
    .populate(['likes', 'dislikes'])

  if (req.query.fields) {
    const fields = (req.query.fields as string).split(',').join(' ')
    queryDocument = queryDocument.select(fields)
  } else {
    queryDocument = queryDocument.select('-__v')
  }

  try {
    const blogs = await queryDocument.sort('-numViews')

    return res.status(200).json({
      message: 'Success',
      data: {
        blogs,
        page,
        pageSize: limit,
        totalPage,
      },
    })
  } catch (error: any) {
    return res.status(400).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
