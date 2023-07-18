import { Request, Response } from 'express'
import Enquiry from '../../models/Enquiry'

export const updateEnquiry = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    if (!updatedEnquiry) {
      return res.status(404).json({
        message: 'Enquiry not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: updatedEnquiry,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
