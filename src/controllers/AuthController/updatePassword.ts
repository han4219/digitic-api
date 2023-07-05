import { Request, Response } from 'express'
import PasswordService from '../../PasswordService'
import { generatePasswordResetToken } from '../../utils/helper'

export const updatePassword = async (req: Request, res: Response) => {
  const user = (req as any).user as any
  const { password } = req.body

  if (!password || password.length < 6 || password.length > 100) {
    return res.status(400).json({
      message: 'Password length must be between 6-100.',
    })
  }

  const passwordService = new PasswordService(password)
  user.password = passwordService.hash()
  user.passwordChangedAt = new Date()
  user.passwordResetToken = generatePasswordResetToken()
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000
  const updatedUser = await user.save()

  return res.status(200).json({
    message: 'Password updated.',
    data: updatedUser,
  })
}
