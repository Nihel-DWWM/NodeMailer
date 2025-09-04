import nodemailer from 'nodemailer';
// import dotenv from 'dotenv'
// dotenv.config()
// console.log(process.env.MAIL_USER)
// create a transporter for SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: 'maire94@getMaxListeners.com',
    pass: 'urtn xkrk miin sqzg',
  },
  tls: {
    rejectUnauthorized: false
    }
});

export default transporter;