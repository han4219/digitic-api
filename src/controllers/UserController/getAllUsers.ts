import { Request, Response } from 'express'
import User from '../../models/User'

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const listUsers = await User.find({})

    return res.status(200).json({
      message: 'Success',
      data: {
        users: listUsers,
      },
    })
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong! ${(error as any).message || ''}`,
    })
  }
}
