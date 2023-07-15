import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'
import Order, { orderStatus } from '../../models/Order'
import { omit } from 'lodash'
import { role } from '../../utils/role'

export const cancelOrder = async (
  req: Request | HavingIdentity,
  res: Response
) => {
  const loggedInUser = (req as HavingIdentity).user
  const { id } = (req as Request).params

  const foundOrder = await Order.findById(id)
  if (!foundOrder) {
    return res.status(400).json({
      message: 'Invalid Id, order not found.',
    })
  }

  try {
    // handle logic cancel for admin
    if (loggedInUser.role === role.ADMIN) {
      if (foundOrder.orderStatus === orderStatus.CANCELLED) {
        return res.status(422).json({
          message: 'Order already cancelled.',
        })
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        {
          orderStatus: orderStatus.CANCELLED,
          $set: { 'paymentIntent.status': orderStatus.CANCELLED },
        },
        { new: true }
      )

      return res.status(200).json({
        message: 'Cancel order successfully',
        data: updatedOrder,
      })
    } else {
      // handle logic cancel order for client
      if (
        foundOrder.orderBy.toString() !== loggedInUser._id.toString() ||
        Object.values(
          omit(orderStatus, ['CASH_ON_DELIVERY', 'PROCESSING', 'NOT_PROCESSED'])
        ).includes(foundOrder.orderStatus as any)
      ) {
        return res.status(422).json({
          message: 'Invalid, Failed to cancel order.',
        })
      }

      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        {
          orderStatus: orderStatus.CANCELLED,
          $set: { 'paymentIntent.status': orderStatus.CANCELLED },
        },
        { new: true }
      )

      return res.status(200).json({
        message: 'Cancel order successfully',
        data: updatedOrder,
      })
    }
  } catch (error: any) {
    return res.status(500).json({
      error: `${error.message || 'Something went wrong!'}`,
    })
  }
}
