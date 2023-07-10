import * as cloudinary from 'cloudinary'
import config from '../config'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

cloudinary.v2.config({
  cloud_name: config().cloudinary.name,
  api_key: config().cloudinary.apiKey,
  api_secret: config().cloudinary.apiSecret,
})

export const uploadImageToCloud = async (
  fileToUpload: string
): Promise<{ url: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(fileToUpload, (err, callResult) => {
      if (err) {
        return reject(err)
      }
      return resolve({
        url: callResult?.secure_url || '',
      })
    })
  })
}
