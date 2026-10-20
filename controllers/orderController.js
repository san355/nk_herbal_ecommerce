const Order = require('../models/Order');
const asyncHandler = require('../middleware/asyncHandler');
const pick = require('../utils/pick');

const EDITABLE = ['orderId', 'productName', 'productPrice'];

// GET /api/orders?userId=...   -> order lines (optionally for one user)
// GET /api/orders/:id           -> one order line
exports.doGet = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const order = await Order.findById(req.params.id).populate('userId', 'clientName phone');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    return res.json({ success: true, data: order });
  }

  const filter = {};
  if (req.query.userId) filter.userId = req.query.userId;
  if (req.query.orderId) filter.orderId = req.query.orderId;

  const orders = await Order.find(filter).populate('userId', 'clientName phone').sort({ _id: -1 });
  res.json({ success: true, count: orders.length, data: orders });
});

// POST /api/orders
// Body: { userId, orderId?, items: [{ productName, productPrice }] }
// or a single line: { userId, orderId?, productName, productPrice }
exports.doPost = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const orderId = req.body.orderId || `ORD-${Date.now()}`;

  const lines = Array.isArray(req.body.items)
    ? req.body.items
    : [{ productName: req.body.productName, productPrice: req.body.productPrice }];

  const docs = lines.map((line) => ({
    userId,
    orderId,
    productName: line.productName,
    productPrice: line.productPrice,
  }));

  const created = await Order.insertMany(docs, { runValidators: true });
  res.status(201).json({ success: true, orderId, count: created.length, data: created });
});

// PUT /api/orders/:id  (admin)
exports.doPut = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, pick(req.body, EDITABLE), {
    new: true,
    runValidators: true,
  });
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, data: order });
});

// DELETE /api/orders/:id  (admin)
exports.doDelete = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, message: 'Order line deleted' });
});
