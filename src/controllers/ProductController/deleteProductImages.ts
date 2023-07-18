import { Request, Response } from 'express'
import Product from '../../models/Product'

export const deleteProductImages = async (req: Request, res: Response) => {
  const { id } = req.params
  const { public_ids } = req.body

  if (!public_ids || !Array.isArray(public_ids) || public_ids.length === 0) {
    return res.status(400).json({
      message: 'Invalid data.',
    })
  }

  try {
    const foundProduct = await Product.findById(id)
    if (!foundProduct) {
      return res.status(404).json({
        message: 'Product not found.',
      })
    }

    let newImages = foundProduct.images.filter(
      (image) => !public_ids.includes(image.public_id)
    )

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        image: newImages[0]?.url || '',
        images: newImages,
      },
      { new: true }
    )

    return res.status(200).json({
      message: 'Product images updated.',
      data: updatedProduct,
    })
  } catch (error: any) {
    return res.status(500).json({
      error: `${error.message || 'Something went wrong!'}`,
    })
  }
}
