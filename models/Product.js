const mongoose = require('mongoose');
const { baseOptions } = require('./baseOptions');

/**
 * product collection
 * fields: id, productName, price, count, stock, category
 */
const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    count: { type: Number, default: 0, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    category: { type: String, required: true, trim: true },
  },
  { ...baseOptions, collection: 'products' }
);

module.exports = mongoose.model('Product', productSchema);
