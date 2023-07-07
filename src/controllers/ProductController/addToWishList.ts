import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'
import User from '../../models/User'
import Product from '../../models/Product'

export const addToWishList = async (
  req: Request | HavingIdentity,
  res: Response
) => {
  const loggedInUser = (req as HavingIdentity).user
  const { productId } = (req as Request).body

  try {
    const foundProduct = await Product.findById(productId)
    if (!foundProduct) {
      return res.status(422).json({
        message: 'Invalid productId, product not found.',
      })
    }

    const alreadyAdded = loggedInUser.wishlist.find(
      (id) => id.toString() === productId
    )

    if (alreadyAdded) {
      const updatedUser = await User.findByIdAndUpdate(
        loggedInUser.id,
        {
          $pull: { wishlist: productId },
        },
        {
          new: true,
        }
      )

      return res.status(200).json({
        message: 'Remove from wish list successfully.',
        data: updatedUser,
      })
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        loggedInUser.id,
        {
          $push: { wishlist: productId },
        },
        { new: true }
      )

      return res.status(200).json({
        message: 'Add to wish list successfully.',
        data: updatedUser,
      })
    }
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
