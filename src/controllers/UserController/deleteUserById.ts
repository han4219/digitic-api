import { Request, Response } from 'express'
import { isValidObjectId } from '../../utils/helper'
import User from '../../models/User'

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: 'This ID is invalid or not found.',
    })
  }

  try {
    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: user,
    })
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong! ${(error as any).message || ''}`,
    })
  }
}
