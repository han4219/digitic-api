import express from 'express'
import user from './user'
import blog from './blog'
import product from './product'
import authentication from './authentication'
import productCategory from './productCategory'

const router = express.Router()

export default () => {
  user(router)
  blog(router)
  product(router)
  authentication(router)
  productCategory(router)

  return router
}
