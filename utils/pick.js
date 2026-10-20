/**
 * Returns a new object that contains only the listed keys.
 * Used so clients cannot write fields that are not in the schema.
 */
module.exports = (obj = {}, keys = []) =>
  keys.reduce((acc, key) => {
    if (obj[key] !== undefined) acc[key] = obj[key];
    return acc;
  }, {});
