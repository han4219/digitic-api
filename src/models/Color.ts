import mongoose from 'mongoose'

export interface IColor {
  name: string
  code: string
}

const colorSchema = new mongoose.Schema<IColor, {}, {}>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Color = mongoose.model('Color', colorSchema)

export default Color
