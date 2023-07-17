import { Router } from 'express'
import { auth, isAdmin } from '../middlewares/auth'
import { isObjectId } from '../middlewares/validate'
import {
  createColor,
  deleteColor,
  getAllColors,
  getColor,
  updateColor,
} from '../controllers/ColorController'

export default (router: Router) => {
  router.get('/colors', getAllColors)
  router.get('/color/:id', isObjectId, getColor)

  // Admin router
  router.post('/admin/colors/create', auth, isAdmin, createColor)
  router.put('/admin/color/update/:id', isObjectId, auth, isAdmin, updateColor)
  router.delete(
    '/admin/color/delete/:id',
    isObjectId,
    auth,
    isAdmin,
    deleteColor
  )
}
