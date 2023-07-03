import { isValidObjectId } from '../../utils/helper'
import { Request, Response } from 'express'
import User from '../../models/User'

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'This ID is invalid or not found.',
    })
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    )

    return res.status(200).json({
      message: 'Success',
      data: updatedUser,
    })
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong! ${(error as any).message || ''}`,
    })
  }
}
