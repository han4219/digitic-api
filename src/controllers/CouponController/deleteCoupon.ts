import { Request, Response } from 'express'
import Coupon from '../../models/Coupon'

export const deleteCoupon = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id)

    if (!deletedCoupon) {
      return res.status(404).json({
        message: 'Coupon not found.',
      })
    }

    return res.status(200).json({
      message: 'Delete coupon successfully.',
      data: deletedCoupon,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
