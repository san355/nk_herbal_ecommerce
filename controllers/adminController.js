const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');

// GET /api/admin?lowStock=5
// Dashboard figures: the cards and the recent-orders table in the admin design.
exports.doGet = asyncHandler(async (req, res) => {
  const lowStockThreshold = Math.max(0, Number(req.query.lowStock) || 5);

  const [totalProducts, lowStockAlerts, totalOrders, totalUsers, salesAgg, recentOrders] =
    await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ stock: { $lte: lowStockThreshold } }),
      Order.countDocuments(),
      User.countDocuments(),
      Order.aggregate([{ $group: { _id: null, total: { $sum: '$productPrice' } } }]),
      Order.find()
        .sort({ _id: -1 })
        .limit(10)
        .populate('userId', 'clientName phone state'),
    ]);

  res.json({
    success: true,
    data: {
      totalProducts,
      lowStockAlerts,
      lowStockThreshold,
      totalOrders,
      totalUsers,
      totalSales: salesAgg[0] ? salesAgg[0].total : 0,
      recentOrders,
    },
  });
});
