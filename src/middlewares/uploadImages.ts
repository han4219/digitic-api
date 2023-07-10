import multer from 'multer'
import path from 'path'
import { Handler, NextFunction, Request, Response } from 'express'
import sharp from 'sharp'
import fs from 'fs'

const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../public/images'))
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    callback(
      null,
      file.originalname.split('.')[0].replace(/ /g, '_') +
        '-' +
        uniqueSuffix +
        '.jpeg'
    )
  },
})
const multerFilter = (
  req: any,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true)
  } else {
    callback({ name: 'UNSUPPORTED_TYPE', message: 'Unsupported file format' })
  }
}

export const multerUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 },
})

export const resizeProductImage: Handler = async (req, res, next) => {
  if (!req.files) return next()

  try {
    await Promise.all(
      (req.files as Express.Multer.File[]).map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`${file.destination}/products/${file.filename}`)
        fs.unlinkSync(`${file.destination}/products/${file.filename}`)
      })
    )
    return next()
  } catch (error) {
    return res.status(422).json({
      error: `${error || 'Something went wrong!'}`,
    })
  }
}

export const resizeBlogImage: Handler = async (req, res, next) => {
  if (!req.files) return next()

  try {
    await Promise.all(
      (req.files as Express.Multer.File[]).map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`${file.destination}/blogs/${file.filename}`)
        fs.unlinkSync(`${file.destination}/blogs/${file.filename}`)
      })
    )
    return next()
  } catch (error) {
    return res.status(422).json({
      error: `${error || 'Something went wrong!'}`,
    })
  }
}
