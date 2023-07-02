import * as mongoose from 'mongoose'

const connectDB = () => {
  const URI = process.env.MONGODB_URI || ''

  mongoose
    .connect(URI, {
      dbName: 'digitic',
    })
    .then(() => {
      console.log('Database connected successfully.')
    })
    .catch((error) => {
      console.log('Failed to connect to Database.', error)
    })
}

export default connectDB
