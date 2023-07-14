import { Router } from 'express'
import { auth } from '../middlewares/auth'
import { createOrder } from '../controllers/OrderController'

export default (router: Router) => {
  router.post('/order', auth, createOrder)
}
