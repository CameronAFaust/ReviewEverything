const nodemailer = require('nodemailer');

const express = require('express');
const router = express.Router();

router.post('/lockedMail', (req,res) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'revieweverymovie@gmail.com',
          pass: 'revAccount'
        }
      });

      let mailToSend = {
        from: 'revieweverymovie@gmail.com',
        to: req.body.email,
        subject: 'Locked Account Reset Your Password',
        text: "Your account has been locked for someone has failed to log in to your account 10 times in a row. Here's the link for changing your password: http://localhost:4200/user/" + req.body.id
      };
      
      transporter.sendMail(mailToSend, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
});

router.post('/passwordMail', (req,res) => {

  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'revieweverymovie@gmail.com',
        pass: 'revAccount'
      }
    });

    let mailToSend = {
      from: 'revieweverymovie@gmail.com',
      to: req.body.email,
      subject: 'Resetting Password',
      text: "Here's the link for resetting your password: http://localhost:4200/user/" + req.body.id
    };
    
    transporter.sendMail(mailToSend, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
});

module.exports = router;