import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();



// create a transporter for SMTP
console.log(process.env.MAIL_HOST);
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, 
    // exemple : 'smtp.gmail.com'
    port: 587,
    secure: false, // false pour STARTTLS (port 587)
    auth: {
        user: process.env.MAIL_USER, // ton adresse email
         pass: process.env.MAIL_PASS // ton mot de passe ou token d'application
    }
});

export default transporter;