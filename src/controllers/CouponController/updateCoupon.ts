import { Request, Response } from 'express'
import Coupon from '../../models/Coupon'

export const updateCoupon = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    if (!updatedCoupon) {
      return res.status(404).json({
        message: 'Coupon not found.',
      })
    }

    return res.status(200).json({
      message: 'Update coupon successfully.',
      data: updatedCoupon,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
