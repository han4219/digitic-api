import { Request, Response } from 'express'
import crypto from 'crypto'
import User from '../../models/User'
import PasswordService from '../../PasswordService'

export const resetPassword = async (req: Request, res: Response) => {
  const { password } = req.body
  const { token } = req.params
  const hashedToken = crypto.createHash('sha256').update(token).digest('base64')

  try {
    const foundUser = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    })

    if (!foundUser) {
      return res.status(400).json({
        message: 'Token is invalid or expired.',
      })
    }

    const passwordService = new PasswordService(password)

    foundUser.password = passwordService.hash()

    await foundUser.save()

    return res.status(200).json({
      message: 'Reset password successfully.',
    })
  } catch (error: any) {
    return res.status(400).json({
      message: `Something went wrong! ${error.message || ''}`,
    })
  }
}
