const crypto = require('crypto');
const mysalt = 'aereecho';

/**
 * Hashs password
 *
 * @param {string} original password
 * @return {string} hashed password
 */
module.exports = function (password) {
  return crypto
    .createHash('sha512')
    .update(password + mysalt)
    .digest('base64');
};
