import { Router } from 'express'
import {
  getProduct,
  addToWishList,
  createProduct,
  deleteProduct,
  getAllProducts,
  ratingProduct,
  updateProduct,
  deleteProductImages,
  uploadProductImages,
  deleteRatingProduct,
} from '../controllers/ProductController'
import { isObjectId } from '../middlewares/validate'
import { auth, isAdmin } from '../middlewares/auth'
import { multerUpload, resizeProductImage } from '../middlewares/uploadImages'

export default (router: Router) => {
  router.get('/products', getAllProducts)
  router.put('/product/add-to-wishlist', auth, addToWishList)
  router.put('/product/rating', auth, ratingProduct)
  router.get('/product/:id', isObjectId, getProduct)

  // Admin router
  router.post('/admin/products/create', auth, isAdmin, createProduct)
  router.delete(
    '/admin/product/delete/:id',
    isObjectId,
    auth,
    isAdmin,
    deleteProduct
  )
  router.put(
    '/admin/product/update/:id',
    isObjectId,
    auth,
    isAdmin,
    updateProduct
  )
  router.delete(
    '/admin/product/rating/delete/:id',
    isObjectId,
    auth,
    isAdmin,
    deleteRatingProduct
  )
  router.post(
    '/admin/product/images/upload/:id',
    isObjectId,
    auth,
    isAdmin,
    multerUpload.array('images', 10),
    resizeProductImage,
    uploadProductImages
  )
  router.put(
    '/admin/product/images/delete/:id',
    isObjectId,
    auth,
    isAdmin,
    deleteProductImages
  )
}
