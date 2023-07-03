import { Request, Response } from 'express'
import Product from '../../models/Product'
import slugify from 'slugify'

export const createProduct = async (req: Request, res: Response) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true, trim: true })
    }

    const newProduct = new Product(req.body)
    await newProduct.save()

    return res.status(201).json({
      message: 'Create product successfully.',
      data: newProduct,
    })
  } catch (error) {
    return res.status(400).json({
      message: `Something went wrong! ${(error as any).message || ''}`,
    })
  }
}
