import nodemailer from 'nodemailer';

const SendMail = async (message) => {
    const config = {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASSWORD,
        }
    }
    const transporter = nodemailer.createTransport(config);
    // Sending Email
    await transporter.sendMail(message)
}

export default SendMail;