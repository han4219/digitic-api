import { Router } from 'express'
import {
  activateUser,
  deactivateUser,
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
  router.put('/user/activate/:id', auth, isAdmin, activateUser)
  router.put('/user/deactivate/:id', auth, isAdmin, deactivateUser)
}
