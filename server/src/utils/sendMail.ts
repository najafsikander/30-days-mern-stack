import nodemailer from 'nodemailer';
import { MAIL_AUTH_PASS, MAIL_AUTH_USER, MAIL_SENDER } from './config';

const transport = nodemailer.createTransport({
    service:'Gmail',
    host: "smtp.gmail.com",
    auth: {
        user: MAIL_AUTH_USER,
        pass: MAIL_AUTH_PASS
    }
    
});

export const sendResetPasswordMail = async (receipientEmail:string) => {
    const mailResponse = await transport.sendMail({
        from : MAIL_SENDER,
        to: receipientEmail,
        subject: 'Reset Password',
        text: 'http://localhost:5173/auth/login',
        html: '<p>Body Here</p>'
    });
    return mailResponse;
}