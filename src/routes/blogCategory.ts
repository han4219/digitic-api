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
  router.post('/blog-categories', auth, isAdmin, createCategory)
  router.get('/blog-categories', getAllCategories)
  router.get('/blog-category/:id', isObjectId, getCategory)
  router.put('/blog-category/:id', isObjectId, auth, isAdmin, updateCategory)
  router.delete('/blog-category/:id', isObjectId, auth, isAdmin, deleteCategory)
}
