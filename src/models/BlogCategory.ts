import mongoose from 'mongoose'

export interface IBlogCategory {
  name: string
}

const blogCategorySchema = new mongoose.Schema<IBlogCategory, {}, {}>(
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

const BlogCategory = mongoose.model('BlogCategory', blogCategorySchema)

export default BlogCategory
