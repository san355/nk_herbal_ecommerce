/**
 * Protects admin-only routes with a shared key sent in the `x-admin-key` header.
 */
module.exports = (req, res, next) => {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) {
    return res.status(500).json({ success: false, message: 'ADMIN_API_KEY is not configured on the server' });
  }
  if (req.get('x-admin-key') !== expected) {
    return res.status(401).json({ success: false, message: 'Unauthorized: admin key missing or wrong' });
  }
  next();
};
