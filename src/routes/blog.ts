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
  router.get('/blog/:id', isObjectId, getBlog)

  //Admin router
  router.post('/admin/blogs/create', auth, isAdmin, createBlog)
  router.put('/admin/blog/update/:id', isObjectId, auth, isAdmin, updateBlog)
  router.delete('/admin/blog/delete/:id', isObjectId, auth, isAdmin, deleteBlog)
  router.post(
    '/admin/blog/upload-images/:id',
    isObjectId,
    auth,
    isAdmin,
    multerUpload.array('images', 2),
    resizeBlogImage,
    uploadBlogImage
  )
}
