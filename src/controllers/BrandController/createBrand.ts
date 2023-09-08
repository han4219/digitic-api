import { Request, Response } from 'express'
import Brand from '../../models/Brand'

export const createBrand = async (req: Request, res: Response) => {
  try {
    const newBrand = await Brand.create(req.body)

    return res.status(201).json({
      message: 'Brand created successfully.',
      data: newBrand,
    })
  } catch (error: any) {
    if(error.message.includes('E11000 duplicate key error collection')){
      return res.status(409).json({
        message: 'Brand already exists.'
      })
    }
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
