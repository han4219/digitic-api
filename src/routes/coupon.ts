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
  router.get('/coupons', auth, getAllCoupons)
  router.get('/coupon/:id', isObjectId, auth, getCoupon)

  // Admin router
  router.post('/admin/coupons/create', auth, isAdmin, createCoupon)
  router.put(
    '/admin/coupon/update/:id',
    isObjectId,
    auth,
    isAdmin,
    updateCoupon
  )
  router.delete(
    '/admin/coupon/delete/:id',
    isObjectId,
    auth,
    isAdmin,
    deleteCoupon
  )
}
