import { Request, Response } from 'express'
import Color from '../../models/Color'

export const deleteColor = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deletedColor = await Color.findByIdAndDelete(id)

    if (!deletedColor) {
      return res.status(404).json({
        message: 'Color not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: deletedColor,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
