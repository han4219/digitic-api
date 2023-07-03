import { Handler } from 'express'
import { isValidObjectId } from '../utils/helper'

export const isObjectId: Handler = async (req, res, next) => {
  const { id } = req.params

  if (isValidObjectId(id)) {
    return next()
  }

  return res.status(422).json({
    message: 'The ID is invalid or not found.',
  })
}
