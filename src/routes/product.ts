import { Router } from 'express'
import {
  addToWishList,
  createProduct,
  deleteProduct,
  deleteRatingProduct,
  getAllProducts,
  getProduct,
  ratingProduct,
  updateProduct,
} from '../controllers/ProductController'
import { isObjectId } from '../middlewares/validate'
import { auth, isAdmin } from '../middlewares/auth'

export default (router: Router) => {
  router.get('/products', getAllProducts)
  router.post('/products/create', auth, isAdmin, createProduct)
  router.put('/product/add-to-wishlist', auth, addToWishList)
  router.put('/product/rating', auth, ratingProduct)
  router.delete(
    '/product/rating/:id',
    isObjectId,
    auth,
    isAdmin,
    deleteRatingProduct
  )
  router.get('/product/:id', isObjectId, getProduct)
  router.delete('/product/:id', isObjectId, auth, isAdmin, deleteProduct)
  router.put('/product/:id', isObjectId, auth, isAdmin, updateProduct)
}
