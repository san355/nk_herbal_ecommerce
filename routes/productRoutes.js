const express = require('express');
const { doGet, doPost, doPut, doDelete } = require('../controllers/productController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Anyone can browse products. Creating, editing and deleting is admin-only.
router.route('/').get(doGet).post(adminAuth, doPost);
router.route('/:id').get(doGet).put(adminAuth, doPut).delete(adminAuth, doDelete);

module.exports = router;
