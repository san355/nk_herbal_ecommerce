const express = require('express');
const { doGet, doPost, doPut, doDelete } = require('../controllers/userController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Customer sign-up is open. Listing, editing and deleting customers is admin-only.
router.route('/').get(adminAuth, doGet).post(doPost);
router.route('/:id').get(doGet).put(adminAuth, doPut).delete(adminAuth, doDelete);

module.exports = router;
