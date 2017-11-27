'use strict';

const express = require('express');
const mailer = require('../mailer');
const router = express.Router();

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * GET /
 */
router.get('/', (req, res, next) => {
  res.render('index', { messages: req.flash(), email: '', message: '' });
});

/**
 * POST /signup
 */
router.post('/signup', (req, res, next) => {
  if (!req.body.email.match(EMAIL_REGEX)) {
    return res.render('index', { messages: { error: 'That is not a valid email' },
                                 email: req.body.email,
                                 message: req.body.message });
  }

  // Send email to main contact
  let siteContactOptions = {
    to: process.env.CONTACT,
    from: process.env.FROM,
    subject: `Message from ${req.body.email}`,
    text: req.body.message
  };
  mailer.transporter.sendMail(siteContactOptions, (error, info) => {
    if (error) {
      return res.render('index', { messages: { error: error },
                                   email: req.body.email,
                                   message: req.body.message });
    }
 
    // Send email to lead
    let leadOptions = {
      to: req.body.email,
      from: process.env.FROM,
      subject: 'Howdy from the Mining King!',
      text: `You are now receiving mining news and deals in the Calgary area. Reply with 'unsubscribe' to be removed.`
    };
    mailer.transporter.sendMail(leadOptions, (error, info) => {
      if (error) {
        return res.render('index', { messages: { error: error },
                                     email: req.body.email,
                                     message: req.body.message });
      }
      req.flash('success', `Check your email (${req.body.email}) for signup confirmation`);
      res.redirect('/');
    });
  });
});


module.exports = router;
