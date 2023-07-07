import { Router } from 'express'
import { auth, isAdmin } from '../middlewares/auth'
import { isObjectId } from '../middlewares/validate'
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
} from '../controllers/CouponController'

export default (router: Router) => {
  router.get('/coupons', auth, isAdmin, getAllCoupons)
  router.post('/coupons', auth, isAdmin, createCoupon)
  router.get('/coupon/:id', isObjectId, auth, isAdmin, getCoupon)
  router.put('/coupon/:id', isObjectId, auth, isAdmin, updateCoupon)
  router.delete('/coupon/:id', isObjectId, auth, isAdmin, deleteCoupon)
}
