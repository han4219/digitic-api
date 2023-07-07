import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'
import Product from '../../models/Product'

export const ratingProduct = async (
  req: Request | HavingIdentity,
  res: Response
) => {
  const loggedInUser = (req as HavingIdentity).user
  const { star, comment, productId } = (req as Request).body

  try {
    const foundProduct = await Product.findById(productId)
    if (!foundProduct) {
      return res.status(422).json({
        message: 'Invalid productId, product not found.',
      })
    }

    const alreadyRating = foundProduct.ratings.find(
      (rating) => rating.postedBy.toString() === loggedInUser.id
    )

    if (alreadyRating) {
      const totalStar = foundProduct.ratings.reduce((prev, current) => {
        return prev + current.star
      }, 0)
      const totalRating = (totalStar / foundProduct.ratings.length).toFixed(1)
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRating },
        },
        {
          $set: { 'ratings.$.star': star, 'ratings.$.comment': comment },
          totalRating,
        }
      )

      return res.status(200).json({
        message: 'Update rating product successfully.',
        data: updateRating,
      })
    } else {
      const totalStar =
        foundProduct.ratings.reduce((prev, current) => {
          return prev + current.star
        }, 0) + star
      const totalRating = (
        totalStar /
        (foundProduct.ratings.length + 1)
      ).toFixed(1)
      const rateProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star,
              comment,
              postedBy: loggedInUser._id,
            },
          },
          totalRating,
        },
        { new: true }
      )

      return res.status(200).json({
        message: 'Rating product successfully.',
        data: rateProduct,
      })
    }
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
