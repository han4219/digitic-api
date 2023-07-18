import { Router } from 'express'
import { auth, isAdmin } from '../middlewares/auth'
import { isObjectId } from '../middlewares/validate'
import {
  getEnquiry,
  createEnquiry,
  deleteEnquiry,
  updateEnquiry,
  getAllEnquiries,
} from '../controllers/EnquiryController'

export default (router: Router) => {
  router.post('/enquiry/create', createEnquiry)

  // Admin router
  router.get('/admin/enquiries', auth, isAdmin, getAllEnquiries)
  router.get('/admin/enquiry/:id', isObjectId, auth, isAdmin, getEnquiry)
  router.put(
    '/admin/enquiry/update/:id',
    isObjectId,
    auth,
    isAdmin,
    updateEnquiry
  )
  router.delete(
    '/admin/enquiry/delete/:id',
    isObjectId,
    auth,
    isAdmin,
    deleteEnquiry
  )
}
