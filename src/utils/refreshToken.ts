import * as jwt from 'jsonwebtoken'
import config from '../config'

export const generateRefreshToken = (id: string) => {
  const secret = config().jwtSecret as string
  return jwt.sign({ id }, secret, { expiresIn: '3d' })
}
