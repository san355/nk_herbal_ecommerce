const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const pick = require('../utils/pick');

const EDITABLE = ['clientName', 'phone', 'email', 'address', 'state'];

// GET /api/users        -> list users (admin)
// GET /api/users/:id    -> one user
exports.doGet = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    return res.json({ success: true, data: user });
  }

  const users = await User.find().sort({ _id: -1 });
  res.json({ success: true, count: users.length, data: users });
});

// POST /api/users  -> create a customer
exports.doPost = asyncHandler(async (req, res) => {
  const user = await User.create(pick(req.body, EDITABLE));
  res.status(201).json({ success: true, data: user });
});

// PUT /api/users/:id  -> update a customer
exports.doPut = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, pick(req.body, EDITABLE), {
    new: true,
    runValidators: true,
  });
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, data: user });
});

// DELETE /api/users/:id  -> remove a customer (admin)
exports.doDelete = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, message: 'User deleted' });
});
