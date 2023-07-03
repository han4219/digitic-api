import { pick } from 'lodash'
import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'

export const getMe = async (req: Request | HavingIdentity, res: Response) => {
  try {
    const user = (req as HavingIdentity).user

    return res.status(200).json({
      message: 'Success',
      data: pick(
        user,
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
