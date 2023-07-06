import { Router } from 'express'
import { auth, isAdmin } from '../middlewares/auth'
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from '../controllers/ProductCategoryController'
import { isObjectId } from '../middlewares/validate'

export default (router: Router) => {
  router.post('/product-categories', auth, isAdmin, createCategory)
  router.get('/product-categories', getAllCategories)
  router.get('/product-category/:id', isObjectId, getCategory)
  router.put('/product-category/:id', isObjectId, auth, isAdmin, updateCategory)
  router.delete(
    '/product-category/:id',
    isObjectId,
    auth,
    isAdmin,
    deleteCategory
  )
}
