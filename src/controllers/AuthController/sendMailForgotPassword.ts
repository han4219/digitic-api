import { Request, Response } from 'express'
import User from '../../models/User'
import { generatePasswordResetToken } from '../../utils/helper'
import { sendEmail } from '../EmailController'

export const sendMailForgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body

  try {
    const foundUser = await User.findOne({ email })

    if (!foundUser) {
      return res.status(404).json({
        message: 'Email does not exists.',
      })
    }

    const { token, hashedToken } = generatePasswordResetToken()

    foundUser.passwordChangedAt = new Date()
    foundUser.passwordResetToken = hashedToken
    foundUser.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000)
    await foundUser.save()
    const resetURL = `Please follow this link to reset your password. This link is valid still 10 minutes from now. <a href="http://localhost:8080/api/v1/auth/reset-password/${token}">Click Here</a>`

    const data = {
      to: email,
      text: 'Hi!',
      subject: 'Forgot Password Link',
      html: resetURL,
    }
    await sendEmail(data)
    return res.status(200).json({
      message: 'Email reset password sent.',
      data: { token },
    })
  } catch (error: any) {
    return res.status(400).json({
      message: `Something went wrong! ${error.message || ''}.`,
    })
  }
}
