import { Request, Response } from 'express'
import slugify from 'slugify'
import Product from '../../models/Product'

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true, trim: true })
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    if (!updatedProduct) {
      return res.status(404).json({
        message: 'Product not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: updatedProduct,
    })
  } catch (error: any) {
    return res.status(400).json({
      message: `Something went wrong! ${error.message || ''}`,
    })
  }
}
