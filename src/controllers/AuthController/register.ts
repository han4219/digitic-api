import { Request, Response } from 'express'
import { isEmail } from '../../utils/helper'
import User from '../../models/User'
import PasswordService from '../../PasswordService'

const requiredFields = ['firstname', 'lastname', 'mobile', 'email', 'password']

export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, mobile, email, password } = req.body

  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      return res.status(400).json({
        message: `${field} is required`,
      })
    }
  })

  if (!isEmail(email || '')) {
    return res.status(400).json({
      message: 'Invalid email.',
    })
  }

  if (password.length < 6 || password.length > 100) {
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
    return res.status(400).json({
      message: `Something went wrong, ${(error as any).message}`,
    })
  }
}
