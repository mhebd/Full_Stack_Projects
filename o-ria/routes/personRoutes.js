const express =  require('express');
const { createPerson, getPersons, getPerson, updatePerson, deletePerson } = require('../controller/personController');
const { auth } = require('../middleware/auth'); 

const router = express.Router();

router.route('/').post(auth, createPerson).get(auth, getPersons);
router.route('/:id').get(auth, getPerson).put(auth, updatePerson).delete(auth, deletePerson);

module.exports = router;