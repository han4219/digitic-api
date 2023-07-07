import { Request, Response } from 'express'
import Coupon from '../../models/Coupon'

export const createCoupon = async (req: Request, res: Response) => {
  try {
    const newCoupon = await Coupon.create(req.body)

    return res.status(200).json({
      message: 'Create new coupon successfully.',
      data: newCoupon,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
