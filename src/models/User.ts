import mongoose, { Schema } from 'mongoose'
import { role } from '../utils/role'

export interface IUserMethods {
  createPasswordResetToken(): Promise<string>
  isPasswordMatched(enteredPassword: string): Promise<boolean>
}

export interface IUser {
  firstname: string
  lastname: string
  email: string
  mobile: string
  password: string
  role: string
  isActive: boolean
  address: string
  wishlist: string[]
  refreshToken: string
  passwordChangedAt: Date
  passwordResetToken: string | null
  passwordResetExpires: Date | null
}

const userSchema = new mongoose.Schema<IUser, {}, IUserMethods>(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: role.CLIENT,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    address: { type: String },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export type UserType = mongoose.InferSchemaType<typeof userSchema>
export default User
