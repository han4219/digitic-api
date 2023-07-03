import * as jwt from 'jsonwebtoken'
import { Handler, Request } from 'express'
import config from '../config'
import User, { UserType } from '../models/User'
import { HavingIdentity } from '../entities/HavingIdentity'
import { role } from '../utils/role'

export const auth: Handler = async (
  req: Request | HavingIdentity,
  res,
  next
) => {
  const token = ((req as Request).headers.authorization || '').replace(
    'Bearer ',
    ''
  )

  if (!token) {
    return res.status(422).json({
      message: 'There is no token attached to header.',
    })
  }

  try {
    const secret = config().jwtSecret as string
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload

    const user = await User.findById(decoded.id)

    if (!user) {
      throw new Error('User not found.')
    }

    ;(req as HavingIdentity).user = user as UserType

    return next()
  } catch (error) {
    return res.status(401).json({
      message: 'Not authorized, token expired. Please login again.',
    })
  }
}

export const isAdmin: Handler = async (
  req: Request | HavingIdentity,
  res,
  next
) => {
  const user = (req as HavingIdentity).user

  if (user.role === role.ADMIN) {
    return next()
  }

  return res.status(401).json({
    message: 'You are not an admin, permission denied.',
  })
}
