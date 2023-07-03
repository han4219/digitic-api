import * as mongoose from 'mongoose'
import config from '../config'

const connectDB = () => {
  const URI = config().mongoDBURI || ''

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
