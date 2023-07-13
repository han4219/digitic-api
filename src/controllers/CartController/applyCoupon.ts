import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'
import Coupon from '../../models/Coupon'
import Cart from '../../models/Cart'

export const applyCoupon = async (
  req: Request | HavingIdentity,
  res: Response
) => {
  const { coupon } = (req as Request).body
  const loggedInUser = (req as HavingIdentity).user

  try {
    let newCoupons = []
    let totalDiscountPercent
    let totalPriceApplyCoupon
    //TODO: check if coupon not exist
    const foundCoupon = await Coupon.findOne({ name: coupon })
    if (!foundCoupon) {
      return res.status(404).json({
        message: 'Coupon not found.',
      })
    }

    newCoupons.push(foundCoupon)

    //TODO: check if cart not exist
    const foundCart = await Cart.findOne({ user: loggedInUser._id }).populate(
      'products.product'
    )
    if (!foundCart) {
      return res.status(404).json({
        message: 'Cart not found.',
      })
    }
    totalPriceApplyCoupon =
      foundCart.priceApplyCoupon || foundCart.priceAfterDiscount

    //TODO: check if coupon is already apply to cart
    const existCoupon = foundCart.coupons.find(
      (coupon) => coupon.toString() === foundCoupon.id
    )

    if (existCoupon) {
      return res.status(422).json({
        message: 'Coupon is already apply to your cart.',
      })
    }

    //TODO: calculate new price after apply discount from coupon
    for (let i = 0; i < foundCart.coupons.length; i++) {
      const getCoupon = await Coupon.findById(foundCart.coupons[i])
      newCoupons.push(getCoupon)
    }

    totalDiscountPercent = newCoupons.reduce((prev, current) => {
      // @ts-ignore
      return prev + current.discount || 0
    }, 0)

    totalPriceApplyCoupon =
      foundCart.priceAfterDiscount -
      foundCart.priceAfterDiscount * (totalDiscountPercent / 100)

    const updatedCart = await Cart.findByIdAndUpdate(
      foundCart.id,
      {
        $set: { coupons: newCoupons.map((coupon) => (coupon as any).id) },
        priceApplyCoupon: totalPriceApplyCoupon,
      },
      { new: true }
    )

    return res.status(200).json({
      message: 'Apply coupon successfully.',
      data: updatedCart,
    })
  } catch (error: any) {
    return res.status(500).json({
      error: `${error.message || 'Something went wrong!'}`,
    })
  }
}
