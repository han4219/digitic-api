import { Request, Response } from 'express'
import Blog from '../../models/Blog'
import { uploadImageToCloud } from '../../utils/cloudinary'

export const uploadBlogImage = async (req: Request, res: Response) => {
  const { id } = req.params
  const foundBlog = await Blog.findById(id)

  if (!foundBlog) {
    return res.status(404).json({
      message: 'Blog not found.',
    })
  }

  const uploader = (filePath: string) => uploadImageToCloud(filePath)

  try {
    const urls: string[] = []

    for (let file of req.files as Express.Multer.File[]) {
      const uploadedUrl = await uploader(file.path)
      urls.push(uploadedUrl.url)
    }

    const newImages = foundBlog.images.concat(urls)

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: newImages,
        image: newImages[0],
      },
      { new: true }
    )

    return res.status(200).json({
      message: 'Upload blog images successfully.',
      data: updatedBlog,
    })
  } catch (error) {
    return res.status(422).json({
      message: `${error || 'Something went wrong!'}`,
    })
  }
}
