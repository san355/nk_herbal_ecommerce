const mongoose = require('mongoose');
const { baseOptions } = require('./baseOptions');

/**
 * card (cart) product collection
 * fields: id, productId (ref Product), userId (ref User), quantity
 *
 * One row per user + product. Adding the same product again increases quantity.
 */
const cartSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { ...baseOptions, collection: 'cart' }
);

cartSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('Cart', cartSchema);
