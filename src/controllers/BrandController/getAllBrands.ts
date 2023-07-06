import { Request, Response } from 'express'
import Brand from '../../models/Brand'

export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await Brand.find({})

    return res.status(200).json({
      message: 'Success',
      data: {
        brands,
      },
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
