import mongoose from 'mongoose'

export interface IEnquiry {
  name: string
  email: string
  phone: string
  status: string
  comment: string
}

const enquirySchema = new mongoose.Schema<IEnquiry, {}, {}>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'Submitted',
      enum: ['Submitted', 'Contacted', 'In Progress'],
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Enquiry = mongoose.model('Enquiry', enquirySchema)

export default Enquiry
