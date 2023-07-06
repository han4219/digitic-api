import { Request, Response } from 'express'
import Brand from '../../models/Brand'

export const updateBrand = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    if (!updatedBrand) {
      return res.status(404).json({
        message: 'Brand not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: updatedBrand,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
