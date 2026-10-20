const mongoose = require('mongoose');
const { baseOptions } = require('./baseOptions');

/**
 * order collection
 * fields: id, userId (ref User), orderId, productName, productPrice
 *
 * An order with several products is stored as one row per product line,
 * all sharing the same orderId (for example "ORD-1001").
 */
const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: String, required: true, trim: true, index: true },
    productName: { type: String, required: true, trim: true },
    productPrice: { type: Number, required: true, min: 0 },
  },
  { ...baseOptions, collection: 'orders' }
);

module.exports = mongoose.model('Order', orderSchema);
