const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');
const pick = require('../utils/pick');
const escapeRegex = require('../utils/escapeRegex');

const EDITABLE = ['productName', 'price', 'count', 'stock', 'category'];

const sortFor = (sort) => {
  switch (sort) {
    case 'price-asc':
      return { price: 1 };
    case 'price-desc':
      return { price: -1 };
    default:
      return { _id: -1 };
  }
};

// GET /api/products?category=&search=&sort=price-asc
// GET /api/products/:id
exports.doGet = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    return res.json({ success: true, data: product });
  }

  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.search) {
    filter.productName = { $regex: escapeRegex(req.query.search), $options: 'i' };
  }

  const products = await Product.find(filter).sort(sortFor(req.query.sort));
  res.json({ success: true, count: products.length, data: products });
});

// POST /api/products  (admin)
exports.doPost = asyncHandler(async (req, res) => {
  const product = await Product.create(pick(req.body, EDITABLE));
  res.status(201).json({ success: true, data: product });
});

// PUT /api/products/:id  (admin)
exports.doPut = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, pick(req.body, EDITABLE), {
    new: true,
    runValidators: true,
  });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
});

// DELETE /api/products/:id  (admin)
exports.doDelete = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, message: 'Product deleted' });
});
