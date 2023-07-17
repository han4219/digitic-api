import { Request, Response } from 'express'
import Color from '../../models/Color'

export const getAllColors = async (req: Request, res: Response) => {
  try {
    const colors = await Color.find({})

    return res.status(200).json({
      message: 'Success',
      data: {
        colors,
      },
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
