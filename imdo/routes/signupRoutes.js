const express = require('express');
const multer = require('multer');
const { renderSignupPage ,signupUser } = require('./../controller/signupController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/user/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });

router.route('/').get(renderSignupPage).post( uploadStorage.single('userPhoto'),signupUser);

module.exports = router;
