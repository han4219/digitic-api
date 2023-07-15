import mongoose from 'mongoose'

export enum orderStatus {
  NOT_PROCESSED = 'Not processed',
  CASH_ON_DELIVERY = 'Cash on delivery',
  PROCESSING = 'Processing',
  DISPATCHED = 'Dispatched',
  CANCELLED = 'Cancelled',
  DELIVERED = 'Delivered',
}

export enum paymentMethod {
  COD = 'COD',
  PAYPAL = 'PAYPAL',
}

export interface IOrder {
  coupons: mongoose.Schema.Types.ObjectId[]
  orderBy: mongoose.Schema.Types.ObjectId
  orderStatus: string
  paymentIntent: {
    id: string
    method: paymentMethod
    cost: number
    status: string
    createdAt: Date
    currency: string
  }
  products: {
    product: string
    count: number
    color: string
    price: number
    priceDiscount: number
  }[]
}

const orderSchema = new mongoose.Schema<IOrder, {}, {}>(
  {
    orderBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderStatus: {
      type: String,
      default: orderStatus.NOT_PROCESSED,
      enum: orderStatus,
    },
    paymentIntent: {
      id: String,
      method: String,
      cost: Number,
      status: String,
      createdAt: Date,
      currency: String,
    },
    coupons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
      },
    ],
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        count: Number,
        color: String,
        price: Number,
        priceDiscount: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
