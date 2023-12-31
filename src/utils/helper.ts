import mongoose from 'mongoose'
import crypto from 'crypto'

export const isEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  return emailPattern.test(email)
}

export const isValidObjectId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id)
}

export const generatePasswordResetToken = (): {
  token: string
  hashedToken: string
} => {
  const token = crypto.randomBytes(32).toString('hex')
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
  return { token, hashedToken }
}
