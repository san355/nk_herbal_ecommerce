/**
 * Escapes characters that have a special meaning in regular expressions,
 * so user search text is matched literally.
 */
module.exports = (str = '') => String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
