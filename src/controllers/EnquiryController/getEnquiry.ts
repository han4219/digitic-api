import { Request, Response } from 'express'
import Enquiry from '../../models/Enquiry'

export const getEnquiry = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const foundEnquiry = await Enquiry.findById(id)

    if (!foundEnquiry) {
      return res.status(404).json({
        message: 'Enquiry not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: foundEnquiry,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
