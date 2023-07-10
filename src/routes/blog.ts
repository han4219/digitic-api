import { Router } from 'express'
import { auth, isAdmin } from '../middlewares/auth'
import { isObjectId } from '../middlewares/validate'
import {
  createBlog,
  deleteBlog,
  dislikeBlog,
  getAllBlogs,
  getBlog,
  likeBlog,
  updateBlog,
} from '../controllers/BlogController'
import { multerUpload, resizeBlogImage } from '../middlewares/uploadImages'
import { uploadBlogImage } from '../controllers/BlogController/uploadBlogImage'

export default (router: Router) => {
  router.get('/blogs', getAllBlogs)
  router.put('/blog/like', auth, likeBlog)
  router.put('/blog/dislike', auth, dislikeBlog)
  router.post('/blogs', auth, isAdmin, createBlog)
  router.get('/blog/:id', isObjectId, getBlog)
  router.put('/blog/:id', isObjectId, auth, isAdmin, updateBlog)
  router.delete('/blog/:id', isObjectId, auth, isAdmin, deleteBlog)
  router.put(
    '/blog/upload/:id',
    isObjectId,
    auth,
    isAdmin,
    multerUpload.array('images', 2),
    resizeBlogImage,
    uploadBlogImage
  )
}
