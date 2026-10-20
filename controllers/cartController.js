const Cart = require('../models/Cart');
const asyncHandler = require('../middleware/asyncHandler');

const PRODUCT_FIELDS = 'productName price category';

// GET /api/cart?userId=...   -> cart rows for a user
// GET /api/cart/:id           -> one cart row
exports.doGet = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const item = await Cart.findById(req.params.id).populate('productId', PRODUCT_FIELDS);
    if (!item) return res.status(404).json({ success: false, message: 'Cart item not found' });
    return res.json({ success: true, data: item });
  }

  const filter = {};
  if (req.query.userId) filter.userId = req.query.userId;

  const items = await Cart.find(filter).populate('productId', PRODUCT_FIELDS).sort({ _id: -1 });
  res.json({ success: true, count: items.length, data: items });
});

// POST /api/cart  { userId, productId, quantity? }
// Adds the product, or increases quantity if the user already has it in the cart.
exports.doPost = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  const quantity = Math.max(1, Number(req.body.quantity) || 1);

  const item = await Cart.findOneAndUpdate(
    { userId, productId },
    { $inc: { quantity } },
    { new: true, upsert: true, runValidators: true }
  ).populate('productId', PRODUCT_FIELDS);

  res.status(201).json({ success: true, data: item });
});

// PUT /api/cart/:id  { quantity }
exports.doPut = asyncHandler(async (req, res) => {
  const quantity = Number(req.body.quantity);
  if (!Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ success: false, message: 'quantity must be a whole number of at least 1' });
  }

  const item = await Cart.findByIdAndUpdate(
    req.params.id,
    { quantity },
    { new: true, runValidators: true }
  ).populate('productId', PRODUCT_FIELDS);

  if (!item) return res.status(404).json({ success: false, message: 'Cart item not found' });
  res.json({ success: true, data: item });
});

// DELETE /api/cart/:id
exports.doDelete = asyncHandler(async (req, res) => {
  const item = await Cart.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Cart item not found' });
  res.json({ success: true, message: 'Cart item removed' });
});
