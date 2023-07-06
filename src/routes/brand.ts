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
  router.post('/brands', auth, isAdmin, createBrand)
  router.get('/brands', getAllBrands)
  router.get('/brand/:id', isObjectId, getBrand)
  router.put('/brand/:id', isObjectId, auth, isAdmin, updateBrand)
  router.delete('/brand/:id', isObjectId, auth, isAdmin, deleteBrand)
}
