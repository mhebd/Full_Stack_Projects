const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const Image = require('./../models/Image');
const User = require('./../models/User');
const jwt = require('jsonwebtoken');

/**
 * @GET Render home page
 */
exports.getAllImage = asyncErr(async (req, res, next) => {
  let query = Image.find();
  query = query.sort('-createdAt');
  const images = await query;
  const decode = await jwt.verify(req.cookies.TOKEN, process.env.JWT_SECRET);
  const users = await User.find();
  const user = await User.findById(decode.id);
  res.render('home', {
    images,
    users,
    user,
  });
});
