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
  router.get('/product-categories', getAllCategories)
  router.get('/product-category/:id', isObjectId, getCategory)

  // Admin router
  router.post('/admin/product-categories/create', auth, isAdmin, createCategory)
  router.put(
    '/admin/product-category/update/:id',
    isObjectId,
    auth,
    isAdmin,
    updateCategory
  )
  router.delete(
    '/admin/product-category/delete/:id',
    isObjectId,
    auth,
    isAdmin,
    deleteCategory
  )
}
