import mongoose from 'mongoose'

interface IProduct {
  title: string
  slug: string
  description: string
  price: number
  category: string
  brand: string
  quantity: number
  sold: number
  images: any
  color: string
  ratings: mongoose.Schema.Types.ObjectId[]
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
    images: {
      type: Array,
    },
    color: {
      type: String,
      required: true,
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export type ProductType = mongoose.InferSchemaType<typeof productSchema>

export default Product
