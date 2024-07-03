// routes/admin.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/admin/login', (req, res) => {
  res.send('Admin Login Page');
});

router.post('/admin/login',
  passport.authenticate('admin', { successRedirect: '/admin/dashboard', failureRedirect: '/admin/login' })
);

router.get('/admin/dashboard', (req, res) => {
  if (req.isAuthenticated() && req.user.userType === 'admin') {
    res.send('Admin Dashboard');
  } else {
    res.redirect('/admin/login');
  }
});

module.exports = router;
