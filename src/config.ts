export default () => {
  return {
    port: process.env.PORT,
    mongoDBURI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
  }
}
