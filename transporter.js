import nodemailer from 'nodemailer';

// create a transporter for SMTP
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, // exemple : 'smtp.gmail.com'
    port: 587,
    secure: false, // false pour STARTTLS (port 587)
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

export default transporter;