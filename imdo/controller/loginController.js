const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const Image = require('./../models/Image');
const User = require('./../models/User');
const jwt = require('jsonwebtoken');

/**
 * @GET Render login page
 */
exports.renderLoginPage = asyncErr(async (req, res, next) => {
  res.render('login');
});

/**
 * @POST Login as a user
 */
exports.loginUser = asyncErr(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new errHandler('Please input a valid email & password', 400));
  }

  const findUser = await User.findOne({ email: email }).select('+password');

  if (
    !findUser ||
    !(await findUser.checkPassword(password, findUser.password))
  ) {
    return next(
      new errHandler('Your password Or email did not match on database', 404)
    );
  }

  const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  req.user = await findUser;

  res.cookie('TOKEN', token, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  const images = await Image.find();

  // res.render('home', {
  //   images,
  //   user: findUser,
  // });

  res.redirect('/');
});
