import express from 'express'
import authentication from './authentication'
import user from './user'
import product from './product'

const router = express.Router()

export default () => {
  user(router)
  product(router)
  authentication(router)

  return router
}
