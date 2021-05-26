const mongoose = require('mongoose');

const socialSchema = new mongoose.Schema({
  profile_name: {
    type: String,
    required: [true, 'Please enter your profile name'],
  },
  site_url: {
    type: String,
    required: [true, 'Plsease enter your site url'],
    unique: true,
  },
  icon_name: {
    type: String,
    required: [true, 'Please enter site icon name as fontawesome icon name'],
  },
});

const Social = mongoose.model('Social', socialSchema);

module.exports = Social;
