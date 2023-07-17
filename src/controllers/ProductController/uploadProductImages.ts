import fs from 'fs'
import { Request, Response } from 'express'
import Product, { IImageItem } from '../../models/Product'
import { uploadImageToCloud } from '../../utils/cloudinary'

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
    const images: IImageItem[] = []

    await Promise.all(
      files.map(async (file) => {
        const uploadedUrl = await uploader(file.path)
        images.push({ url: uploadedUrl.url, public_id: uploadedUrl.public_id })
        fs.unlinkSync(file.path)
      })
    )

    const newImages = foundProduct.images.concat(images)

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        image: newImages[0].url,
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
