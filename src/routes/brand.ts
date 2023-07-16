import { Router } from 'express'
import { auth, isAdmin } from '../middlewares/auth'
import { isObjectId } from '../middlewares/validate'
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrand,
  updateBrand,
} from '../controllers/BrandController'

export default (router: Router) => {
  router.get('/brands', getAllBrands)
  router.get('/brand/:id', isObjectId, getBrand)

  // Admin router
  router.post('/admin/brands/create', auth, isAdmin, createBrand)
  router.put('/admin/brand/update/:id', isObjectId, auth, isAdmin, updateBrand)
  router.delete(
    '/admin/brand/delete/:id',
    isObjectId,
    auth,
    isAdmin,
    deleteBrand
  )
}
