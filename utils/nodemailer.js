const nodemailer = require('nodemailer');

nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  const sendMail = async (to, subject, text) => {
    try {
      await transporter.sendMail({
        from: '"Birthday Wish" <fhunsukwangudu@gmail.com>',
        to:"fhunsukwangudu@gmail.com",
        subject:"hello",
        text: "Hello world?",
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  module.exports = { sendMail };