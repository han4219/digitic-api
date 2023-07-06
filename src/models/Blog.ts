import mongoose from 'mongoose'
import { role } from '../utils/role'

interface IBlog {
  title: string
  image: string
  author: string
  numViews: number
  category: string
  isLiked: boolean
  description: string
  isDisliked: boolean
  dislikes: mongoose.Schema.Types.ObjectId[]
  likes: mongoose.Schema.Types.ObjectId[]
}

const blogSchema = new mongoose.Schema<IBlog, {}, {}>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    image: {
      type: String,
      default:
        'https://st2.depositphotos.com/1006899/8421/i/600/depositphotos_84219350-stock-photo-word-blog-suspended-by-ropes.jpg',
    },
    author: {
      type: String,
      default: role.ADMIN,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
)

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
