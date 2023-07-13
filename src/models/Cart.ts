import mongoose from 'mongoose'

export type ProductInCart = {
  product: string
  count: number
  color: string
  price: number
  priceDiscount?: number
}

export interface ICart {
  products: ProductInCart[]
  user: mongoose.Schema.Types.ObjectId
  coupons: mongoose.Schema.Types.ObjectId[]
  priceBeforeDiscount: number
  priceAfterDiscount: number
  priceApplyCoupon: number
}

const CartSchema = new mongoose.Schema<ICart, {}, {}>(
  {
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        count: Number,
        color: String,
        price: Number,
        priceDiscount: Number,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    coupons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
      },
    ],
    priceBeforeDiscount: Number,
    priceAfterDiscount: Number,
    priceApplyCoupon: Number,
  },
  {
    timestamps: true,
  }
)

const Cart = mongoose.model('Cart', CartSchema)

export default Cart