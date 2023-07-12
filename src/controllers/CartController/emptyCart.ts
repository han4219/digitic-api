import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'
import Cart from '../../models/Cart'

export const emptyCart = async (
  req: Request | HavingIdentity,
  res: Response
) => {
  const loggedInUser = (req as HavingIdentity).user

  try {
    const deletedCart = await Cart.findOneAndDelete({ user: loggedInUser._id })

    if (!deletedCart) {
      return res.status(200).json({
        message: 'Cart already empty.',
      })
    }

    return res.status(200).json({
      message: 'Delete cart successfully',
      data: deletedCart,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
