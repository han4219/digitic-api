import { Request, Response } from 'express'
import Enquiry from '../../models/Enquiry'

export const deleteEnquiry = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id)

    if (!deletedEnquiry) {
      return res.status(404).json({
        message: 'Enquiry not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: deletedEnquiry,
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
