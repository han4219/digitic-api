export default () => {
  return {
    port: process.env.PORT,
    mongoDBURI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    mail: {
      user: process.env.MAIL_ID,
      pass: process.env.APP_PASS,
    },
    cloudinary: {
      name: process.env.CLOUDINARY_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
  }
}
