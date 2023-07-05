import { Router } from 'express'
import { auth } from '../middlewares/auth'
import {
  login,
  logout,
  refreshToken,
  register,
  resetPassword,
  sendMailForgotPassword,
  updatePassword,
} from '../controllers/AuthController'

export default (router: Router) => {
  router.post('/auth/login', login)
  router.post('/auth/logout', logout)
  router.post('/auth/register', register)
  router.post('/refreshToken', refreshToken)
  router.post('/forgot-password', sendMailForgotPassword)
  router.put('/auth/password/update', auth, updatePassword)
  router.post('/auth/reset-password/:token', resetPassword)
}
