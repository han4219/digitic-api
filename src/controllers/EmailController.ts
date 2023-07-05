import nodemailer from 'nodemailer'
import config from '../config'

export const sendEmail = async (data: {
  to: string
  subject: string
  text: string
  html: string
}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config().mail.user,
      pass: config().mail.pass,
    },
  })

  const info = await transporter.sendMail({
    from: config().mail.user, // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  })

  console.log(info)
}
