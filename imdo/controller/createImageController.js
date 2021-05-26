const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const Image = require('./../models/Image');
const User = require('./../models/User');
const jwt = require('jsonwebtoken');

/**
 * @GET Render create image page
 */
exports.getForm = asyncErr(async (req, res, next) => {
  const decode = await jwt.verify(req.cookies.TOKEN, process.env.JWT_SECRET);
  const user = await User.findById(decode.id);
  res.render('createimage', {
    user,
  });
});

/**
 * @POST Create a new image
 */
exports.createImage = asyncErr(async (req, res, next) => {
  const decode = await jwt.verify(req.cookies.TOKEN, process.env.JWT_SECRET);
  const userDetails = await User.findById(decode.id);

  const details = req.body.details;
  const image = req.file.filename;
  const user_id = userDetails._id;

  const newImage = await Image.create({
    image,
    details,
    user_id,
  });

  res.redirect('/');
});
