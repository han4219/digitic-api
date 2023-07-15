import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'
import Order from '../../models/Order'

export const getOrders = async (
  req: Request | HavingIdentity,
  res: Response
) => {
  const loggedInUser = (req as HavingIdentity).user

  try {
    const orders = await Order.find({ orderBy: loggedInUser._id })
      .populate('coupons', '_id name discount')
      .populate(
        'products.product',
        '_id title description image category brand color'
      )
      .exec()

    if (!orders) {
      return res.status(200).json({
        message: 'Success',
        data: [],
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: orders,
    })
  } catch (error: any) {
    return res.status(500).json({
      error: `${error.message || 'Something went wrong!'}`,
    })
  }
}
