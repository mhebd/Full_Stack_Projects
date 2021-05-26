const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const Image = require('./../models/Image');
const User = require('./../models/User');
const jwt = require('jsonwebtoken');

/**
 * @GET Render single page
 */
exports.getImage = asyncErr(async (req, res, next) => {
  const id = req.params.id;
  const image = await Image.findById(id);
  const decode = await jwt.verify(req.cookies.TOKEN, process.env.JWT_SECRET);
  const users = await User.find();
  const user = await User.findById(decode.id);
  res.render('single', {
    image,
    users,
    user,
  });
});

/**
 * @POST Create a comment
 */

exports.createComment = asyncErr(async (req, res, next) => {
  const id = req.params.id;
  const user_id = req.body.userId;
  const user_name = req.body.userName;
  const user_image = req.body.userImage;
  const comment = req.body.comment;
  const image = await Image.findByIdAndUpdate(id, {
    $push: {
      comments: { user_id, user_name, user_image, comment },
    },
  });
  const decode = await jwt.verify(req.cookies.TOKEN, process.env.JWT_SECRET);
  const user = await User.findById(decode.id);
  res.redirect(`/image/${id}`);
});
