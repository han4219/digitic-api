import { Request, Response } from 'express'
import Enquiry from '../../models/Enquiry'

export const createEnquiry = async (req: Request, res: Response) => {
  try {
    const newEnquiry = await Enquiry.create(req.body)

    return res.status(201).json({
      message: 'Enquiry created successfully.',
      data: newEnquiry,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
