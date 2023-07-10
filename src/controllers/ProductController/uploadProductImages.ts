import { Request, Response } from 'express'
import Product from '../../models/Product'
import { uploadImageToCloud } from '../../utils/cloudinary'
import fs, { read } from 'fs'
import { log } from 'util'

export const uploadProductImages = async (req: Request, res: Response) => {
  const { id } = req.params
  const files = req.files as Express.Multer.File[]

  try {
    const foundProduct = await Product.findById(id)

    if (!foundProduct) {
      return res.status(404).json({
        message: 'Product not found.',
      })
    }

    const uploader = (filePath: string) => uploadImageToCloud(filePath)
    const urls: string[] = []

    await Promise.all(
      files.map(async (file) => {
        const uploadedUrl = await uploader(file.path)
        urls.push(uploadedUrl.url)
      })
    )

    const newImages = foundProduct.images.concat(urls)

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        image: newImages[0],
        images: newImages,
      },
      { new: true }
    )

    return res.status(200).json({
      message: 'Upload product images successfully.',
      files: updatedProduct,
    })
  } catch (error) {
    return res.status(422).json({
      message: `${error || 'Something went wrong!'}`,
    })
  }
}
