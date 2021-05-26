const asyncErr = require('../util/asyncErr');
const errHandler = require('../util/errHandler');
const User = require('./../models/User');
const jwt = require('jsonwebtoken');

/**
 * @GET Render about page
 */
exports.renderLogin = asyncErr(async (req, res, next) => {
  if (req.user) {
    res.redirect('/home');
  } else {
    res.render('login', { user: req.user });
  }
});

/**
 * @POST login a user
 */
exports.loginUser = asyncErr(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return next(
      new errHandler('Please provide a valid email and password', 404)
    );
  }

  const user = await User.findOne({ email: email }).select('+password');

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(
      new errHandler(
        'Your Email Or Password did not match in our database',
        404
      )
    );
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  res.cookie('TOKEN', token, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  res.redirect('/home');
});
