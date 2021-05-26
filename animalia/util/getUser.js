const User = require('./../models/User');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  let token;
  if (req.cookies.TOKEN) {
    token = req.cookies.TOKEN;
  }

  if (!token) {
    return next();
  }
  const decode = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decode.id);

  if (!user) {
    return next();
  }

  req.user = user;

  next();
};
