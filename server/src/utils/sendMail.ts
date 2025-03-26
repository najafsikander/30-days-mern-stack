import nodemailer from 'nodemailer';
import { MAIL_AUTH_PASS, MAIL_AUTH_USER, MAIL_SENDER } from './config.js';

const transport = nodemailer.createTransport({
    service:'Gmail',
    host: "smtp.gmail.com",
    auth: {
        user: MAIL_AUTH_USER,
        pass: MAIL_AUTH_PASS
    }
    
});

export const sendResetPasswordMail = async (receipientEmail:string,token:string) => {
    const mailResponse = await transport.sendMail({
        from : MAIL_SENDER,
        to: receipientEmail,
        subject: 'Reset Password',
        text: 'http://localhost:5173/auth/newPassword?token='+token,
        html: `<p>Body Here</p>
        <a href="http://localhost:5173/auth/newPassword?token=${token}">click here</a>
        `
    });
    return mailResponse;
}