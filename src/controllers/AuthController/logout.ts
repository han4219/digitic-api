import { Request, Response } from 'express'
import User from '../../models/User'

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
