import { Request, Response } from 'express'
import Color from '../../models/Color'

export const updateColor = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    if (!updatedColor) {
      return res.status(404).json({
        message: 'Color not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: updatedColor,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
