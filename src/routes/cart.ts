import { Router } from 'express'
import { auth } from '../middlewares/auth'
import {
  getCart,
  addToCart,
  emptyCart,
  applyCoupon,
  removeCoupon,
} from '../controllers/CartController'

export default (router: Router) => {
  router.get('/cart', auth, getCart)
  router.post('/cart/add', auth, addToCart)
  router.delete('/cart/make-empty', auth, emptyCart)
  router.post('/cart/apply-coupon', auth, applyCoupon)
  router.post('/cart/remove-coupon', auth, removeCoupon)
}
