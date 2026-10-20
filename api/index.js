/**
 * API gateway: mounts every feature router under /api.
 *
 *   GET    /api/health
 *   /api/users      -> userRoutes
 *   /api/products   -> productRoutes
 *   /api/cart       -> cartRoutes
 *   /api/orders     -> orderRoutes
 *   /api/admin      -> adminRoutes
 */
const express = require('express');

const userRoutes = require('../routes/userRoutes');
const productRoutes = require('../routes/productRoutes');
const cartRoutes = require('../routes/cartRoutes');
const orderRoutes = require('../routes/orderRoutes');
const adminRoutes = require('../routes/adminRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ success: true, status: 'ok', time: new Date().toISOString() });
});

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
