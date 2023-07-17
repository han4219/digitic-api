import { Request, Response } from 'express'
import { deleteMultipleImagesFromCloud } from '../../utils/cloudinary'

export const deleteImages = async (req: Request, res: Response) => {
  const { images } = req.body

  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({
      message: 'Invalid data',
    })
  }

  try {
    const deleter = (imagesList: string[]) =>
      deleteMultipleImagesFromCloud(imagesList)

    deleter(images)
      .then(({ result }) => {
        return res.status(200).json({
          message: 'Delete images successfully',
          data: {
            deleted: Object.keys(result.deleted).filter(
              (key) => result.deleted[key] === 'deleted'
            ),
            failed: Object.keys(result.deleted).filter(
              (key) => result.deleted[key] === 'not_found'
            ),
          },
        })
      })
      .catch((error) => {
        return res.status(422).json({
          message: 'Delete images failed',
          error,
        })
      })
  } catch (error: any) {
    return res.status(500).json({
      error: `${error.message || 'Something went wrong!'}`,
    })
  }
}
