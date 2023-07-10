import { Router } from 'express'
import { auth } from '../middlewares/auth'
import {
  login,
  logout,
  register,
  loginAdmin,
  refreshToken,
  resetPassword,
  sendMailForgotPassword,
  updatePassword,
} from '../controllers/AuthController'

export default (router: Router) => {
  router.post('/auth/login', login)
  router.post('/auth/logout', logout)
  router.post('/auth/register', register)
  router.post('/refreshToken', refreshToken)
  router.post('/auth/admin/login', loginAdmin)
  router.post('/forgot-password', sendMailForgotPassword)
  router.put('/auth/password/update', auth, updatePassword)
  router.put('/auth/reset-password/:token', resetPassword)
}
