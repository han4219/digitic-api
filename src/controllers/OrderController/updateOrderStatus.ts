import { Request, Response } from 'express'
import Order, { orderStatus } from '../../models/Order'

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body

  if (!Object.values(orderStatus).includes(status)) {
    return res.status(400).json({
      message: 'Invalid status',
    })
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        $set: { 'paymentIntent.status': status },
      },
      { new: true }
    )

    if (!updatedOrder) {
      return res.status(404).json({
        message: 'Order not found.',
      })
    }

    return res.status(200).json({
      message: 'Update order status successfully.',
      data: updatedOrder,
    })
  } catch (error: any) {
    return res.status(500).json({
      error: `${error.message || 'Something went wrong!'}`,
    })
  }
}
