import { pick } from 'lodash'
import User from '../models/User'
import * as jwt from 'jsonwebtoken'
import { isEmail } from '../utils/helper'
import { Request, Response } from 'express'
import PasswordService from '../PasswordService'
import { generateToken } from '../utils/jwtToken'
import { generateRefreshToken } from '../utils/refreshToken'
import config from '../config'

const requiredFields = ['firstname', 'lastname', 'mobile', 'email', 'password']

export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, mobile, email, password } = req.body

  if (!mobile) {
    return res.status(400).json({
      message: 'Mobile is required.',
    })
  }

  if (!firstname) {
    return res.status(400).json({
      message: 'Firstname is required.',
    })
  }

  if (!lastname) {
    return res.status(400).json({
      message: 'Lastname is required.',
    })
  }

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
    const findUser = await User.findOne({ email })
    if (findUser) {
      return res.status(422).json({
        message: 'Account is already exists.',
      })
    }

    const passwordService = new PasswordService(password)
    const hashedPassword = passwordService.hash()

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      mobile,
      password: hashedPassword,
    })

    return res.status(201).json({
      message: 'Success',
      data: {
        user: newUser,
      },
    })
  } catch (error) {
    if ((error as any).message?.includes('mobile')) {
      return res.status(422).json({
        message: 'Phone number is already in use.',
      })
    }
    return res.status(500).json({
      message: `Something went wrong, ${(error as any).message}`,
    })
  }
}

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

    const refreshToken = generateRefreshToken(foundUser._id.toString())

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
            'refreshToken',
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

export const refreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies
  const refreshToken = cookies.refreshToken

  if (!refreshToken) {
    return res.status(401).json({
      message: 'No refresh token in cookies.',
    })
  }

  const foundUser = await User.findOne({ refreshToken })

  if (!foundUser) {
    return res.status(404).json({
      message: 'No refresh token found. Invalid refresh token.',
    })
  }

  jwt.verify(
    refreshToken,
    config().jwtSecret as string,
    (error: any, decoded: any) => {
      if (error || decoded.id !== foundUser.id) {
        return res.status(401).json({
          message:
            'Something went wrong with refresh token. Refresh token is invalid.',
        })
      }

      const accessToken = generateToken(foundUser._id.toString())

      return res.status(200).json({
        message: 'Success',
        data: {
          accessToken,
        },
      })
    }
  )
}

export const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies
  const refreshToken = cookies.refreshToken

  if (!refreshToken) {
    return res.status(401).json({
      message: 'No refresh token in cookies.',
    })
  }

  const foundUser = await User.findOne({ refreshToken })
  if (!foundUser) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
    })
    return res.sendStatus(403)
  }

  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: '',
    }
  )

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
  })

  return res.status(200).json({
    message: 'Logout successfully.',
  })
}
