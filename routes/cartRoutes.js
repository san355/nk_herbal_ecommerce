const express = require('express');
const { doGet, doPost, doPut, doDelete } = require('../controllers/cartController');

const router = express.Router();

// Cart actions are open to customers (they are scoped by userId).
router.route('/').get(doGet).post(doPost);
router.route('/:id').get(doGet).put(doPut).delete(doDelete);

module.exports = router;
