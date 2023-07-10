import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'
import User from '../../models/User'

export const updateAddress = async (
  req: Request | HavingIdentity,
  res: Response
) => {
  const { address } = (req as Request).body
  const loggedInUser = (req as HavingIdentity).user

  try {
    const updatedUser = await User.findByIdAndUpdate(
      loggedInUser.id,
      {
        address,
      },
      { new: true }
    )

    return res.status(200).json({
      message: 'Success',
      data: updatedUser,
    })
  } catch (error: any) {
    return res.status(500).json({
      error: `${error.message || 'Something went wrong!'}`,
    })
  }
}
