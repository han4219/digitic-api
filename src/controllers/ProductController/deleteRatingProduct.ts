import { Request, Response } from 'express'
import Product from '../../models/Product'

export const deleteRatingProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  const { productId } = req.body

  const foundProduct = await Product.findById(productId)
  if (!foundProduct) {
    return res.status(404).json({
      message: 'Product not found',
    })
  }

  const isRatingExist = foundProduct.ratings.find(
    (rating) => rating._id.toString() === id
  )
  if (!isRatingExist) {
    return res.status(404).json({
      message: 'Rating does not exists.',
    })
  }

  try {
    const totalStar =
      foundProduct.ratings.reduce((prev, current) => {
        return prev + current.star
      }, 0) - isRatingExist.star
    const totalRating = (totalStar / (foundProduct.ratings.length - 1)).toFixed(
      1
    )

    const deletedProductRating = await Product.findByIdAndUpdate(
      productId,
      {
        $pull: { ratings: { $eq: isRatingExist } },
        totalRating,
      },
      { new: true }
    )

    return res.status(200).json({
      message: 'Delete rating successfully.',
      data: deletedProductRating,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
