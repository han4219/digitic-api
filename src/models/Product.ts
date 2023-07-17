import mongoose from 'mongoose'

export interface IImageItem {
  url: string
  public_id: string
}

export interface IProduct {
  title: string
  slug: string
  description: string
  price: number
  priceDiscount?: number
  category: string
  brand: string
  quantity: number
  sold: number
  image: string
  images: IImageItem[]
  colors: mongoose.Schema.Types.ObjectId[]
  tags: []
  ratings: {
    _id: string
    star: number
    comment: string
    postedBy: mongoose.Schema.Types.ObjectId
  }[]
  totalRating: number
}

interface IProductMethods {}

const productSchema = new mongoose.Schema<IProduct, {}, IProductMethods>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceDiscount: {
      type: Number,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    images: [],
    colors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
      },
    ],
    tags: [],
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    totalRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
