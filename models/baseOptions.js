/**
 * Shared schema options.
 * - `id: false` stops Mongoose adding its own virtual `id`.
 * - The JSON output exposes `_id` as `id` so the frontend gets `id` directly.
 * - `versionKey: false` removes the internal `__v` field.
 * - No timestamps are added, so the collections keep only the fields requested.
 */
const baseOptions = {
  id: false,
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      return ret;
    },
  },
};

module.exports = { baseOptions };
