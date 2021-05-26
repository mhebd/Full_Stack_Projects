const express = require('express');
const multer = require('multer');
const { protect, author } = require('./../controller/auth');
const {
  renderCpanel,
  updateCpanel,
} = require('./../controller/cpanelController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/cpanel');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router
  .route('/')
  .get(protect, renderCpanel)
  .post(
    protect,
    upload.fields([
      {
        name: 'logo',
        maxContent: 1,
      },
      {
        name: 'profile_image',
        maxContent: 1,
      },
    ]),
    updateCpanel
  );

module.exports = router;
