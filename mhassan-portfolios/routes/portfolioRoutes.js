const express = require('express');
const multer = require('multer');
const { protect, author } = require('./../controller/auth');
const {
  getAllPortfolio,
  renderPortfolio,
  createPortfolio,
} = require('./../controller/portfolioController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const uploadMany = multer({ storage: storage });

router.route('/api').get(getAllPortfolio);

router
  .route('/')
  .get(protect, renderPortfolio)
  .post(
    protect,
    uploadMany.fields([
      {
        name: 'cover_image',
        maxCount: 1,
      },
    ]),
    createPortfolio
  );

module.exports = router;

// uploadStorage.single('cover_image')
