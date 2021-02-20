const nodemailer = require("nodemailer");

export let mailer = nodemailer.createTransport({
  host: process.env.SMTP_SENDINBLUE,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.SENDINBLUE_PASSWORD, // generated ethereal password
  },
  tls:{
    rejectUnauthorized: false
  }
});