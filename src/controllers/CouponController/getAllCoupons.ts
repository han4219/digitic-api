import { Request, Response } from 'express'
import Coupon from '../../models/Coupon'

export const getAllCoupons = async (req: Request, res: Response) => {
  try {
    const allCoupons = await Coupon.find({})

    return res.status(200).json({
      message: 'Get all coupons successfully.',
      data: {
        allCoupons,
      },
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
