import { Request, Response } from 'express'
import { HavingIdentity } from '../../entities/HavingIdentity'

export const createOrder = async (
  req: Request | HavingIdentity,
  res: Response
) => {
  const { COD } = (req as Request).body
  const loggedInUser = (req as HavingIdentity).user

  try {
  } catch (error: any) {
    return res.status(500).json({
      message: `${error.message || 'Something went wrong!'}`,
    })
  }
}
