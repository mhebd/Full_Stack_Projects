const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const User = require('./../models/User');
const jwt = require('jsonwebtoken');

/**
 * @Protect Protect secret routes
 */
exports.protect = asyncErr(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.TOKEN) {
    token = req.cookies.TOKEN;
  }

  if (!token) {
    // return next(
    //   new errHandler('You are not a logedin user. Please login...', 404)
    // );

    return res.redirect('/login');
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET);

  const getUser = await User.findById(decode.id);

  if (!getUser) {
    // return next(new errHandler('User is no longer exist', 404));
    return res.redirect('/signup');
  }

  if (await getUser.checkPasswordChangeAt(decode.iat)) {
    return next(new errHandler('User recently changed password...', 404));
  }

  next();
});

/**
 * @Authorization Authorization controll
 */

exports.authorize = (...rolls) => {
  return (req, res, next) => {
    if (!rolls.includes(req.user.roll)) {
      return next(
        new errHandler(`The user is not authorize for this page`, 401)
      );
    }
    next();
  };
};
