import nodemailer from 'nodemailer';

 export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Utilizza "true" per la porta 465, "false" per tutte le altre porte
  auth: {
    user: process.env.USER_MAILER,
    pass: process.env.PASS_MAILER,
  },
});

transporter.verify().then(() => {
  console.log('Pronto per inviare e-mail...');
});