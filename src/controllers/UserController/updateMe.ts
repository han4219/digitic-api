import { pick } from 'lodash'
import User from '../../models/User'
import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'

export const updateMe = async (
  req: Request | HavingIdentity,
  res: Response
) => {
  try {
    const user = (req as HavingIdentity).user

    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        firstname: (req as Request)?.body?.firstname,
        lastname: (req as Request)?.body?.lastname,
        mobile: (req as Request)?.body?.mobile,
      },
      {
        new: true,
      }
    )
    return res.status(200).json({
      message: 'Success',
      data: pick(
        updatedUser,
        '_id',
        'isActive',
        'firstname',
        'lastname',
        'email',
        'mobile',
        'role',
        'cart',
        'address',
        'wishlist',
        'createdAt',
        'updatedAt'
      ),
    })
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong! ${(error as any).message || ''}`,
    })
  }
}
