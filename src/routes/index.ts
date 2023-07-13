import express from 'express'
import user from './user'
import blog from './blog'
import brand from './brand'
import coupon from './coupon'
import product from './product'
import blogCategory from './blogCategory'
import authentication from './authentication'
import productCategory from './productCategory'
import cart from './cart'

const router = express.Router()

export default () => {
  user(router)
  cart(router)
  blog(router)
  brand(router)
  coupon(router)
  product(router)
  blogCategory(router)
  authentication(router)
  productCategory(router)

  return router
}
