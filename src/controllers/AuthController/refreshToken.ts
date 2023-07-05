import { Request, Response } from 'express'
import User from '../../models/User'
import * as jwt from 'jsonwebtoken'
import config from '../../config'
import { generateToken } from '../../utils/jwtToken'

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
