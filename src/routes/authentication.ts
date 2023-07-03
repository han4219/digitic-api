import { Router } from 'express'
import {
  login,
  logout,
  refreshToken,
  register,
} from '../controllers/AuthController'

export default (router: Router) => {
  router.post('/auth/register', register)
  router.post('/auth/login', login)
  router.post('/auth/logout', logout)
  router.post('/refreshToken', refreshToken)
}
