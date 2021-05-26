const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const User = require('./../models/User');

/**
 *@GET Get all imagess
 */

exports.getAllUsers = asyncErr(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

/**
 * @POST create a new User
 */

exports.createUser = asyncErr(async (req, res, next) => {
  const { name, email, password, confirmPassword, createdAt } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
    createdAt,
  });

  res.status(201).json({
    success: true,
    data: newUser,
  });
});

/**
 * @GET get a user
 */
exports.getUser = asyncErr(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.render('user');
});
