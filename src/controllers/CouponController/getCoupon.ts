import { Request, Response } from 'express'
import Coupon from '../../models/Coupon'

export const getCoupon = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const foundCoupon = await Coupon.findById(id)

    if (!foundCoupon) {
      return res.status(404).json({
        message: 'Coupon not found.',
      })
    }

    return res.status(200).json({
      message: 'Get a coupon successfully.',
      data: foundCoupon,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
