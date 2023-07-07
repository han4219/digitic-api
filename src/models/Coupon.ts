import mongoose from 'mongoose'

export interface ICoupon {
  name: string
  expiry: Date
  discount: number
}

const couponSchema = new mongoose.Schema<ICoupon, {}, {}>({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
})

const Coupon = mongoose.model('Coupon', couponSchema)

export default Coupon
