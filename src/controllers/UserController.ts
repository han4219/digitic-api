import { Request, Response } from 'express'
import User from '../models/User'
import { HavingIdentity } from '../entities/HavingIdentity'
import { pick } from 'lodash'

// Get All Users
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
    return res.sendStatus(500)
  }
}

// Get Me
export const getMe = async (req: Request | HavingIdentity, res: Response) => {
  try {
    const user = (req as HavingIdentity).user

    return res.status(200).json({
      message: 'Success',
      data: pick(
        user,
        '_id',
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
    return res.status(400).json({
      message: `Invalid user id, ${(error as any).message || ''}`,
    })
  }
}

// Update Me
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
    return res.status(400).json({
      message: `Invalid user id, ${(error as any).message || ''}`,
    })
  }
}

// Get An User By Id
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)

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
    return res.status(400).json({
      message: `Invalid user id, ${(error as any).message}`,
    })
  }
}

// Delete An User By Id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
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
    return res.status(400).json({
      message: `Invalid user id, ${(error as any).message}`,
    })
  }
}

// Update An User By Id
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params

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

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found.',
      })
    }

    return res.status(200).json({
      message: 'Success',
      data: updatedUser,
    })
  } catch (error) {
    return res.status(400).json({
      message: `Invalid user id, ${(error as any).message}`,
    })
  }
}
