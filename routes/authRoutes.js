const express = require('express');
const passport = require('../config/passport');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.error(err);
        return res.render('register');
      }
      passport.authenticate('local')(req, res, () => {
        res.redirect('/dashboard');
      });
    }
  );
});

// Login
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
);

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
