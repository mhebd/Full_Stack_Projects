const errHandler = require('./../util/errHandler');
const asyncErr = require('./../util/asyncErr');
const jwt = require('jsonwebtoken');

exports.protect = asyncErr(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startswith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.TOKEN) {
    token = req.cookies.TOKEN;
  }

  if (!token) {
    return next(new errHandler('Your not a loged in user', 404));
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET);

  let author = false;
  if (decode.id.toString() == process.env.C_PANEL_ID.toString()) {
    author = true;
  }

  if (!author) {
    return next(new errHandler('You are not authorize for this router.', 404));
  }

  next();
});
