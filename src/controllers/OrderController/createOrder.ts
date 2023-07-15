import { v4 as uuid } from 'uuid'
import { Request, Response } from 'express'
import Cart from '../../models/Cart'
import Order, {
  orderStatus,
  paymentMethod as PaymentMethod,
} from '../../models/Order'
import { HavingIdentity } from '../../entities/HavingIdentity'
import Product from '../../models/Product'

export const createOrder = async (
  req: Request | HavingIdentity,
  res: Response
) => {
  const { paymentMethod } = (req as Request).body
  const loggedInUser = (req as HavingIdentity).user

  //TODO: check if payment method is invalid
  if (!(paymentMethod in PaymentMethod)) {
    return res.status(400).json({
      message: 'Invalid payment method, Please select a valid payment method.',
    })
  }

  //TODO: find user cart
  const foundCart = await Cart.findOne({
    user: loggedInUser._id,
  }).populate(['coupons', 'products.product'])
  if (!foundCart) {
    return res.status(422).json({
      message: 'Cart not found.',
    })
  }

  try {
    //TODO: create new order
    const newOrder = await new Order({
      orderBy: loggedInUser._id,
      orderStatus: orderStatus.CASH_ON_DELIVERY,
      products: foundCart.products,
      coupons: foundCart.coupons,
      paymentIntent: {
        id: uuid(),
        currency: 'usd',
        method: paymentMethod,
        status: orderStatus.CASH_ON_DELIVERY,
        cost: foundCart.priceApplyCoupon,
        createdAt: Date.now(),
      },
    }).save()

    // Delete cart
    await Cart.findByIdAndDelete(foundCart.id)

    // update product quantity and sold amount
    const bulkQuery = foundCart.products.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    }))

    await Product.bulkWrite(bulkQuery, {})

    return res.status(201).json({
      message: 'Create order successfully',
      data: newOrder,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
