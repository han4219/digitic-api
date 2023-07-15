import { Router } from 'express'
import { auth, isAdmin } from '../middlewares/auth'
import {
  getOrders,
  createOrder,
  cancelOrder,
  updateOrderStatus,
} from '../controllers/OrderController'
import { isObjectId } from '../middlewares/validate'

export default (router: Router) => {
  // Client
  router.get('/orders', auth, getOrders)
  router.post('/orders/create-order', auth, createOrder)
  router.put('/order/cancel/:id', isObjectId, auth, cancelOrder)
  router.put(
    '/order/update-status/:id',
    isObjectId,
    auth,
    isAdmin,
    updateOrderStatus
  )

  // Admin
  router.put('/admin/order/cancel/:id', isObjectId, auth, isAdmin, cancelOrder)
}
