import * as cloudinary from 'cloudinary'
import config from '../config'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.v2.config({
  cloud_name: config().cloudinary.name,
  api_key: config().cloudinary.apiKey,
  api_secret: config().cloudinary.apiSecret,
})

export const uploadImageToCloud = async (
  fileToUpload: string
): Promise<{ url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(fileToUpload, (err, callResult) => {
      if (err) {
        return reject(err)
      }
      return resolve({
        url: callResult?.secure_url || '',
        public_id: callResult?.public_id || '',
      })
    })
  })
}

export const deleteImageFromCloud = async (
  publicId: string
): Promise<{ url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicId, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve({
        url: result?.secure_url || '',
        public_id: result?.public_id || '',
      })
    })
  })
}

export const deleteMultipleImagesFromCloud = async (
  images: string[]
): Promise<{ result: any }> => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.api.delete_resources(images, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve({
        result,
      })
    })
  })
}

export const getAllImagesFromCloud = async () => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.api.resources({ all: true }, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}
