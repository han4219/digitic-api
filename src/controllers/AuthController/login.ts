import { Request, Response } from 'express'
import { isEmail } from '../../utils/helper'
import PasswordService from '../../PasswordService'
import User from '../../models/User'
import { generateRefreshToken } from '../../utils/refreshToken'
import { pick } from 'lodash'
import { generateToken } from '../../utils/jwtToken'

export const login = async (req: Request, res: Response) => {
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

    const foundUser = await User.findOne({ email })

    if (!foundUser) {
      return res.status(404).json({
        message: 'Account does not exists.',
      })
    }

    const isMatchedPassword = await passwordService.matched(foundUser.password)

    if (!isMatchedPassword) {
      return res.status(422).json({
        message: 'Password does not match.',
      })
    }

    const refreshToken = generateRefreshToken(foundUser.id)

    const updatedUser = await User.findByIdAndUpdate(
      foundUser._id,
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
          accessToken: generateToken(foundUser._id.toString()),
        },
      },
    })
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong. ${(error as any).message}`,
    })
  }
}
