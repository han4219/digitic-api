import { IUser, IUserMethods } from '../models/User'
import mongoose from 'mongoose'

export type HavingIdentity = {
  user: mongoose.Document<unknown, {}, IUser> &
    Omit<IUser & { _id: mongoose.Types.ObjectId }, keyof IUserMethods> &
    IUserMethods
}
