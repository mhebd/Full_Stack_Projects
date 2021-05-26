const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');

/**
 * @PROTECT protect unwanted login
 */
exports.protect = asyncErr(async (req, res, next) => {
  let token;
  if (req.cookies.TOKEN) {
    token = req.cookies.TOKEN;
  }

  if (!token) {
    return next(
      new errHandler('Your are not loged in. Please login first.', 404)
    );
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decode.id);

  if (!user) {
    return next(new errHandler('Resorce can not find.', 404));
  }

  req.user = user;

  next();
});

/**
 * @AUTHORIZE author portection
 */
exports.author = (...roll) => {
  return (req, res, next) => {
    if (!includes(req.user.roll)) {
      return next(
        new errHandler('Your are not authorized to access this page.', 401)
      );
    }
  };
};
