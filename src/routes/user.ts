import { Router } from 'express'

import { auth, isAdmin } from '../middlewares/auth'
import {
  getMe,
  getUser,
  updateMe,
  deleteUser,
  updateUser,
  getAllUsers,
  activateUser,
  deactivateUser,
  getWishList,
  updateAddress,
} from '../controllers/UserController'

export default (router: Router) => {
  router.get('/user/me', auth, getMe)
  router.put('/user/me', auth, updateMe)
  router.get('/user/wishlist', auth, getWishList)
  router.get('/users', auth, isAdmin, getAllUsers)
  router.put('/user/update-address', auth, updateAddress)

  router.get('/user/:id', auth, isAdmin, getUser)
  router.put('/user/:id', auth, isAdmin, updateUser)
  router.delete('/user/:id', auth, isAdmin, deleteUser)
  router.put('/user/activate/:id', auth, isAdmin, activateUser)
  router.put('/user/deactivate/:id', auth, isAdmin, deactivateUser)
}
