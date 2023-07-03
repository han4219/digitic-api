import mongoose from 'mongoose'
import { role } from '../utils/role'

const userSchema = new mongoose.Schema(
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
    cart: {
      type: Array,
      default: [],
    },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export type UserType = mongoose.InferSchemaType<typeof userSchema>
export default User