import { Router } from 'express'
import { auth, isAdmin } from '../middlewares/auth'
import { isObjectId } from '../middlewares/validate'
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from '../controllers/BlogCategoryController'

export default (router: Router) => {
  router.get('/blog-categories', getAllCategories)
  router.get('/blog-category/:id', isObjectId, getCategory)

  // Admin router
  router.post('/admin/blog-categories/create', auth, isAdmin, createCategory)
  router.put(
    '/admin/blog-category/update/:id',
    isObjectId,
    auth,
    isAdmin,
    updateCategory
  )
  router.delete(
    '/admin/blog-category/delete/:id',
    isObjectId,
    auth,
    isAdmin,
    deleteCategory
  )
}
