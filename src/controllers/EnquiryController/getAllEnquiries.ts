import { Request, Response } from 'express'
import Enquiry from '../../models/Enquiry'

export const getAllEnquiries = async (req: Request, res: Response) => {
  try {
    const enquiries = await Enquiry.find({})

    return res.status(200).json({
      message: 'Success',
      data: {
        enquiries,
      },
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
