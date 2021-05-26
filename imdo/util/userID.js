const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const decode = await jwt.verify(req.cookies.TOKEN, process.env.JWT_SECRET);
  // console.log(decode);
  return decode.id;
  next();
};
