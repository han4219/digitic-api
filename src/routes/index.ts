import express from 'express'
import user from './user'
import blog from './blog'
import product from './product'
import blogCategory from './blogCategory'
import authentication from './authentication'
import productCategory from './productCategory'
import brand from './brand'

const router = express.Router()

export default () => {
  user(router)
  blog(router)
  brand(router)
  product(router)
  blogCategory(router)
  authentication(router)
  productCategory(router)

  return router
}
