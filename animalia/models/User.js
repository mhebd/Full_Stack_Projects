const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'A user must be a first name.'],
    minLength: [3, 'First name  must be at least 3 characters'],
  },
  last_name: {
    type: String,
    required: [true, 'A user must be a last name.'],
    minLength: [3, 'Last name must be at least 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'A user must be a email address.'],
    unique: true,
    minLength: [12, 'Email must be at least 12 characters'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'The email is not a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'A user must be a password.'],
    minLength: [8, 'Password must be at least 8 characters'],
  },
  confirm_password: {
    type: String,
    required: [true, 'A user must be a confirm password.'],
    minLength: [8, 'Confirm password must be at least 8 characters'],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: 'Your Password And Confirm Password did not match',
    },
  },
  user_avatar: {
    type: String,
    default: 'user_avatar.png',
  },
  roll: {
    type: String,
    default: 'user',
    enum: ['user'],
  },
  professional_identity: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  biodata: {
    type: String,
    default: '',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  password_change_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirm_password = undefined;
});

userSchema.methods.checkPassword = async function (pass, userPass) {
  return await bcrypt.compare(pass, userPass);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
