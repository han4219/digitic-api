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
  router.put('/user/me/update', auth, updateMe)
  router.get('/user/wishlists', auth, getWishList)
  router.put('/user/address/update', auth, updateAddress)

  // Admin router
  router.get('/admin/user/:id', auth, isAdmin, getUser)
  router.get('/admin/users', auth, isAdmin, getAllUsers)
  router.put('/admin/user/update/:id', auth, isAdmin, updateUser)
  router.delete('/admin/user/delete/:id', auth, isAdmin, deleteUser)
  router.put('/admin/user/activate/:id', auth, isAdmin, activateUser)
  router.put('/admin/user/deactivate/:id', auth, isAdmin, deactivateUser)
}
