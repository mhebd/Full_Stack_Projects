const express =  require('express');

//Controller implements
const auth = require('../middleware/auth');
const { createQuote, getQuotes, updateQuote, deleteQuote } =  require('../controller/quoteController');

const router = express.Router();

router.route('/').post(auth, createQuote).get(auth, getQuotes);
router.route('/:id').put(auth, updateQuote).delete(auth,  deleteQuote);

module.exports = router;