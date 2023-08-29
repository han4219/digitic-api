import http from 'http'
import dotenv from 'dotenv'
import express from 'express'
import router from './routes'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import connectDB from './utils/connectDB'
import config from './config'
import morgan from 'morgan'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())
const PORT = config().port || 8080
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running at port', PORT)
})

connectDB()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use('/api/v1', router())
