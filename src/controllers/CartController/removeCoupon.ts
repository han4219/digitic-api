import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'
import Coupon from '../../models/Coupon'
import Cart from '../../models/Cart'

export const removeCoupon = async (
  req: Request | HavingIdentity,
  res: Response
) => {
  const { coupon } = (req as Request).body
  const loggedInUser = (req as HavingIdentity).user

  //TODO: check valid coupon
  const foundCoupon = await Coupon.findOne({ name: coupon })
  if (!foundCoupon) {
    return res.status(400).json({
      message: 'Invalid coupon, coupon not found',
    })
  }

  //TODO: check valid cart
  const foundCart = await Cart.findOne({
    user: loggedInUser._id,
  }).populate('coupons')
  if (!foundCart) {
    return res.status(422).json({
      message: 'Cart not found',
    })
  }

  //TODO: check if coupon does not applied yet
  const foundExistCoupon = foundCart.coupons.find(
    (coupon: any) => coupon._id.toString() === foundCoupon.id
  )
  if (!foundExistCoupon) {
    return res.status(422).json({
      message: 'Coupon has not been applied to this cart.',
    })
  }

  try {
    //TODO: calculate new price and update cart
    let newCoupons: any = foundCart.coupons.filter(
      (coupon: any) => coupon._id.toString() !== foundCoupon.id
    )
    const newDiscountPercent = newCoupons.reduce(
      (prev: number, coupon: any) => {
        return prev + coupon.discount
      },
      0
    )
    let priceAfterRemoveCoupon =
      foundCart.priceAfterDiscount -
      foundCart.priceAfterDiscount * (newDiscountPercent / 100)

    const updatedCart = await Cart.findByIdAndUpdate(
      foundCart.id,
      {
        $set: { coupons: newCoupons.map((coupon: any) => coupon._id) },
        priceApplyCoupon: priceAfterRemoveCoupon,
      },
      { new: true }
    )

    return res.status(200).json({
      message: 'Remove coupon from cart successfully.',
      data: updatedCart,
    })
  } catch (error: any) {
    return res.status(500).json({
      error: `${error.message || 'Something went wrong!'}`,
    })
  }
}
