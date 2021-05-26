const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please input a name'],
    minLength: [3, 'Name must be at least 3 characters'],
    maxLength: [20, 'Name should not exceed 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please input a valid email address'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'The email is not a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please input a valid password'],
    minLength: [6, 'Password must be at least 6 characters'],
    maxLength: [16, 'Password should not exceed 2 16 characters'],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please input confirm password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Confirm password did not match with your password',
    },
  },
  userImage: {
    type: String,
    required: [true, 'Please input A Image'],
    unique: true,
  },
  short_desc: {
    type: String,
    default: 'Professional Identity',
  },
  description: {
    type: String,
    default: 'About Yourself',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangeAt: {
    type: Date,
    default: Date.now,
  },
  roll: {
    type: String,
    enum: ['user'],
    default: 'user',
  },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
});

userSchema.methods.checkPassword = async function (userPass, dbPass) {
  return await bcrypt.compare(userPass, dbPass);
};

userSchema.methods.checkPasswordChangeAt = async function (jwtTime) {
  const passChangeTime = await parseInt(
    this.passwordChangeAt.getTime() / 1000,
    10
  );
  return passChangeTime > jwtTime;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
