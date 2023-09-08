import { Request, Response } from 'express'
import Color from '../../models/Color'

export const createColor = async (req: Request, res: Response) => {
  try {
    const newColor = await Color.create(req.body)

    return res.status(201).json({
      message: 'Color created successfully.',
      data: newColor,
    })
  } catch (error: any) {
    if(error.message.includes('duplicate key error collection')){
      return res.status(409).json({
        message: 'Color already exists.'
      })
    }
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
