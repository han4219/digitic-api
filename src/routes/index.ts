import express from 'express'
import cart from './cart'
import user from './user'
import blog from './blog'
import color from './color'
import order from './order'
import brand from './brand'
import coupon from './coupon'
import enquiry from './enquiry'
import product from './product'
import cloudinary from './cloudinary'
import blogCategory from './blogCategory'
import authentication from './authentication'
import productCategory from './productCategory'

const router = express.Router({ mergeParams: true })

export default () => {
  user(router)
  cart(router)
  blog(router)
  color(router)
  order(router)
  brand(router)
  coupon(router)
  enquiry(router)
  product(router)
  cloudinary(router)
  blogCategory(router)
  authentication(router)
  productCategory(router)

  return router
}
