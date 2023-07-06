import express from 'express'
import authentication from './authentication'
import user from './user'
import product from './product'
import blog from './blog'

const router = express.Router()

export default () => {
  user(router)
  blog(router)
  product(router)
  authentication(router)

  return router
}
