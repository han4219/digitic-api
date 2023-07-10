import { Request, Response } from 'express'
import { isEmail } from '../../utils/helper'
import PasswordService from '../../PasswordService'
import User from '../../models/User'
import { generateRefreshToken } from '../../utils/refreshToken'
import { pick } from 'lodash'
import { generateToken } from '../../utils/jwtToken'
import { role } from '../../utils/role'

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!isEmail(email || '')) {
    return res.status(400).json({
      message: 'Invalid email.',
    })
  }

  if (!password || password.length < 6 || password.length > 100) {
    return res.status(400).json({
      message: 'Password length must be between 6-100.',
    })
  }

  try {
    const passwordService = new PasswordService(password)
    const foundAdmin = await User.findOne({ email })

    if (!foundAdmin) {
      return res.status(404).json({
        message: 'Account does not exists.',
      })
    }

    if (foundAdmin.role !== role.ADMIN) {
      return res.status(401).json({
        message: 'Not Authorized',
      })
    }

    const isMatchedPassword = await passwordService.matched(foundAdmin.password)

    if (!isMatchedPassword) {
      return res.status(422).json({
        message: 'Password does not match.',
      })
    }

    const refreshToken = generateRefreshToken(foundAdmin.id)

    const updatedUser = await User.findByIdAndUpdate(
      foundAdmin._id,
      {
        refreshToken,
      },
      { new: true }
    )

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    })

    return res.status(200).json({
      message: 'Success',
      data: {
        user: {
          ...pick(updatedUser, [
            '_id',
            'firstname',
            'lastname',
            'email',
            'role',
            'mobile',
          ]),
          accessToken: generateToken(foundAdmin._id.toString()),
        },
      },
    })
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
