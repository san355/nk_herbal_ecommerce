const express = require('express');
const { doGet, doPost, doPut, doDelete } = require('../controllers/orderController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Customers place and view orders. Editing and deleting orders is admin-only.
router.route('/').get(doGet).post(doPost);
router.route('/:id').get(doGet).put(adminAuth, doPut).delete(adminAuth, doDelete);

module.exports = router;
