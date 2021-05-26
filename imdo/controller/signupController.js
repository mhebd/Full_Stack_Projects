const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const Image = require('./../models/Image');
const User = require('./../models/User');
const jwt = require('jsonwebtoken');

/**
 * @POST create a new User
 */

exports.renderSignupPage = asyncErr(async (req, res, next) => {
  res.render('signup');
});

/**
 * @POST Signup as a user
 */
exports.signupUser = asyncErr(async (req, res, next) => {
  const { name, email, password, confirmPassword, createdAt } = req.body;

  const userImage = await req.file.filename;

  if (!email || !password || !name || !confirmPassword || !userImage) {
    return next(
      new errHandler(
        'Please input a name, a valid email, password, user Image & confirm password',
        400
      )
    );
  }

  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
    userImage,
    createdAt,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  req.user = await newUser;

  res.cookie('TOKEN', token, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  const images = await Image.find();

  // res.render('home', {
  //   images,
  //   user: newUser,
  // });

  res.redirect('/');
});
