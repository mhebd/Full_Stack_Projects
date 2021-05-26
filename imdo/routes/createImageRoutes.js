const express = require('express');
const multer = require('multer');
const { protect, authorize } = require('./../controller/auth');
const { getForm, createImage } = require('./../controller/createImageController');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/post/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });


router.route('/').get(protect, getForm).post(protect, uploadStorage.single('photo'), createImage);


module.exports = router;