const express = require('express');
const { doGet } = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Every admin route requires the x-admin-key header.
router.use(adminAuth);

// GET /api/admin  -> dashboard metrics and recent orders
router.get('/', doGet);

module.exports = router;
