import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from '../controllers/ProductController'
import { isObjectId } from '../middlewares/validate'
import { auth, isAdmin } from '../middlewares/auth'

export default (router: Router) => {
  router.get('/products', getAllProducts)
  router.post('/products/create', auth, isAdmin, createProduct)
  router.get('/product/:id', isObjectId, getProduct)
  router.delete('/product/:id', isObjectId, auth, isAdmin, deleteProduct)
  router.put('/product/:id', isObjectId, auth, isAdmin, updateProduct)
}
