import mongoose from 'mongoose'

export enum orderStatus {
  NOT_PROCESSED = 'Not processed',
  CASH_ON_DELIVERY = 'Cash on delivery',
  PROCESSING = 'Processing',
  DISPATCHED = 'Dispatched',
  CANCELLED = 'Cancelled',
  DELIVERED = 'Delivered',
}

export interface IOrder {
  orderBy: mongoose.Schema.Types.ObjectId
  orderStatus: string
  paymentIntent: string
  products: {
    product: string
    count: number
    color: string
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
    paymentIntent: { type: String, default: 'paypal' },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        count: Number,
        color: String,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
