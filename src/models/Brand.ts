import mongoose from 'mongoose'

export interface IBrand {
  name: string
}

const brandSchema = new mongoose.Schema<IBrand, {}, {}>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

const Brand = mongoose.model('Brand', brandSchema)

export default Brand
