const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const Image = require('./../models/Image');
const User = require('./../models/User');
const jwt = require('jsonwebtoken');

/**
 * @GET get a user
 */
exports.getUser = asyncErr(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  let query = Image.find({ user_id: id });
  const decode = await jwt.verify(req.cookies.TOKEN, process.env.JWT_SECRET);
  const curUser = await User.findById(decode.id);
  const images = await query;
  res.render('user', {
    images,
    user,
    curUser,
  });
});

/**
 * @GET get a user edit profile
 */
exports.getEditProfile = asyncErr(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.render('editprofile', {
    user,
  });
});

/**
 * @POST post user edit profile
 */
exports.postEditProfile = asyncErr(async (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const short_desc = req.body.short_desc;
  const description = req.body.description;
  const user = await User.findByIdAndUpdate(
    id,
    { name, short_desc, description },
    {
      new: true,
      runValidators: true,
    }
  );
  res.redirect(`/user/${id}`);
});
