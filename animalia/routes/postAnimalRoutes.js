const express = require('express');
const multer = require('multer');
const { protect } = require('./../controllers/authController');
const getUser = require('./../util/getUser');
const {
  renderPostAnimal,
  postAnimal,
} = require('./../controllers/postAnimalController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/post');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });

router
  .route('/')
  .get(protect, getUser, renderPostAnimal)
  .post(
    protect,
    getUser,
    uploadStorage.fields([
      {
        name: 'cover_image',
        maxCount: 1,
      },
      {
        name: 'images',
        maxCount: 12,
      },
    ]),
    postAnimal
  );
module.exports = router;
