const express = require('express');
const { protect, authorize } = require('./../controller/auth');
const router = express.Router();

router.route('/').post(protect, (req, res, next) => {
  res.cookie('TOKEN', 'token', {
    maxAge: 0,
    httpOnly: true,
  });
  res.render('login');
});

module.exports = router;
