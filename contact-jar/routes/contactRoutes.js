const express =  require('express');
const { getContacts, createContact, updateContact, deleteContact } =  require('../controllers/contractController');
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/').get(auth, getContacts).post(auth, createContact);
router.route('/:id').put(auth, updateContact).delete(auth, deleteContact);

module.exports =  router;