import { isValidObjectId } from '../../utils/helper'
import { Request, Response } from 'express'
import User from '../../models/User'

export const activateUser = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'This ID is invalid or not found.',
    })
  }

  try {
    const activatedUser = await User.findByIdAndUpdate(
      id,
      {
        isActive: true,
      },
      { new: true }
    )

    return res.status(200).json({
      message: 'Success',
      data: activatedUser,
    })
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong! ${(error as any).message || ''}`,
    })
  }
}
