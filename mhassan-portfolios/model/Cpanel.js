const mongoose = require('mongoose');

const cpanelSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: [true, 'Please enter a logo.'],
  },
  banner: {
    type: String,
    required: [true, 'Please enter a banner text.'],
  },
  main_web_link: {
    type: String,
    required: [true, 'Please enter main website link'],
  },
  fiverr_link: {
    type: String,
    required: [true, 'Please enter fiverr link'],
  },
  profile_image: {
    type: String,
    required: [true, 'Please enter profile image'],
  },
  about: {
    type: String,
    required: [true, 'Please enter your details.'],
  },
  quote: {
    type: String,
    required: [true, 'Please enter your quote'],
  },
  cv_down_link: {
    type: String,
    required: [true, 'Please enter cv downlaod link'],
  },
});

const Cpanel = mongoose.model('Cpanel', cpanelSchema);

module.exports = Cpanel;
