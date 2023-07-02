import express from 'express'
import User from '../models/User'
import { isEmail } from '../utils/helper'
import PasswordService from '../PasswordService'
import { omit, pick } from 'lodash'

const requiredFields = ['firstname', 'lastname', 'mobile', 'email', 'password']

export const register = async (req: express.Request, res: express.Response) => {
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
    console.log(error, 'error')
    return res.status(500).json({
      message: `Something went wrong, ${(error as any).message}`,
    })
  }
}

export const login = async (req: express.Request, res: express.Response) => {
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

    return res.status(200).json({
      message: 'Success',
      data: {
        user: pick(foundUser, [
          '_id',
          'firstname',
          'lastname',
          'email',
          'mobile',
          'createdAt',
          'updatedAt',
        ]),
      },
    })
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong. ${(error as any).message}`,
    })
  }
}
