import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'
import Cart from '../../models/Cart'

export const getCart = async (req: Request | HavingIdentity, res: Response) => {
  const loggedInUser = (req as HavingIdentity).user

  try {
    const foundCart = await Cart.findOne({ user: loggedInUser._id }).populate(
      'products.product',
      '_id title description price category brand quantity sold image'
    )

    if (!foundCart) {
      return res.status(200).json({
        message: 'Cart empty.',
        data: {},
      })
    }

    return res.status(200).json({
      message: 'Get cart successfully.',
      data: foundCart,
    })
  } catch (error: any) {
    return res.status(500).json({
      error: `${error.message || 'Something went wrong!'}`,
    })
  }
}
