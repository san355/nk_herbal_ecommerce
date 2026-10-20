const mongoose = require('mongoose');
const { baseOptions } = require('./baseOptions');

/**
 * user collection
 * fields: id, clientName, phone, email, address, state
 */
const userSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    address: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
  },
  { ...baseOptions, collection: 'users' }
);

module.exports = mongoose.model('User', userSchema);
