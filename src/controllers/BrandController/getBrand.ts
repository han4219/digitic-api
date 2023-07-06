import { Request, Response } from 'express'
import Brand from '../../models/Brand'

export const getBrand = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const foundBrand = await Brand.findById(id)

    if (!foundBrand) {
      return res.status(404).json({
        message: 'Brand not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: foundBrand,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
