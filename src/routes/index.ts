import express from 'express'
import cart from './cart'
import user from './user'
import blog from './blog'
import order from './order'
import brand from './brand'
import coupon from './coupon'
import product from './product'
import blogCategory from './blogCategory'
import authentication from './authentication'
import productCategory from './productCategory'

const router = express.Router({ mergeParams: true })

export default () => {
  user(router)
  cart(router)
  blog(router)
  order(router)
  brand(router)
  coupon(router)
  product(router)
  blogCategory(router)
  authentication(router)
  productCategory(router)

  return router
}
