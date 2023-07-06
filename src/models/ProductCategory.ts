import mongoose from 'mongoose'

export interface IProductCategory {
  name: string
}

const productCategorySchema = new mongoose.Schema<IProductCategory, {}, {}>(
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

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema)

export default ProductCategory
