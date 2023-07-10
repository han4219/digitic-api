import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'
import User from '../../models/User'

export const getWishList = async (
  req: Request | HavingIdentity,
  res: Response
) => {
  const loggedInUser = (req as HavingIdentity).user

  try {
    const getUser = await User.findById(loggedInUser.id).populate('wishlist')

    if (!getUser) {
      return res.send({
        data: [],
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: getUser.wishlist,
    })
  } catch (error: any) {
    return res.status(500).json({
      error: `${error.message || 'Something went wrong!'}`,
    })
  }
}
