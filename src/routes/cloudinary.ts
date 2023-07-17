import { Router } from 'express'
import { auth, isAdmin } from '../middlewares/auth'
import { deleteImages } from '../controllers/CloudinaryController'

export default (router: Router) => {
  router.post('/admin/cloudinary/images/delete', auth, isAdmin, deleteImages)
}
