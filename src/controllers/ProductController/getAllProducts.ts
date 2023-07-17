import { Request, Response } from 'express'
import Product from '../../models/Product'

export const getAllProducts = async (req: Request, res: Response) => {
  const queryObj = { ...req.query }

  // Filtering
  const excludeFields = ['page', 'sort', 'limit', 'fields']
  excludeFields.forEach((field) => delete queryObj[field])
  let queryStr = JSON.stringify(queryObj)
  queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`)

  let queryDocument = Product.find(JSON.parse(queryStr)).populate(
    'colors',
    'name code'
  )

  // Sorting
  if (req.query.sort) {
    const sortValue = req.query.sort as string
    const sortBy = sortValue.split(',').join(' ')
    queryDocument = queryDocument.sort(sortBy)
  } else {
    queryDocument = queryDocument.sort('-createdAt')
  }

  // Limiting the fields
  if (req.query.fields) {
    const fields = (req.query.fields as string).split(',').join(' ')
    queryDocument = queryDocument.select(fields)
  } else {
    queryDocument = queryDocument.select('-__v')
  }

  // Pagination
  const productCounts = await Product.countDocuments()
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 30
  const skip = (page - 1) * limit
  const totalPage = Math.round(productCounts / limit) || 1
  queryDocument = queryDocument.skip(skip).limit(limit)

  if (req.query.page && page > totalPage) {
    return res.status(404).json({
      message: 'This page does not exists.',
    })
  }

  try {
    const allProducts = await queryDocument

    return res.status(200).json({
      message: 'Success',
      data: {
        products: allProducts,
        page,
        pageSize: limit,
        totalPage,
      },
    })
  } catch (error: any) {
    return res.status(400).json({
      message: `Something went wrong! ${error.message || ''}`,
    })
  }
}
