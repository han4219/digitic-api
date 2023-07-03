import { Router } from 'express'
import {
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  updateMe,
  updateUser,
} from '../controllers/UserController'
import { auth, isAdmin } from '../middlewares/auth'

export default (router: Router) => {
  router.get('/users', auth, isAdmin, getAllUsers)
  router.get('/user/me', auth, getMe)
  router.put('/user/me', auth, updateMe)
  router.get('/user/:id', auth, isAdmin, getUser)
  router.delete('/user/:id', auth, isAdmin, deleteUser)
  router.put('/user/:id', auth, isAdmin, updateUser)
}
