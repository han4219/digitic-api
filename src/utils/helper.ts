import mongoose from 'mongoose'

export const isEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  return emailPattern.test(email)
}

export const isValidObjectId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id)
}
