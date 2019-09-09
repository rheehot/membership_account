const uuid = require('uuid/v1');

/**
 * Creates Session then passing session Id and cookie options.
 *
 * @param {object,object,function} request, response, next
 * @return {} No return
 */

module.exports = function (req, res, next) {
  const sessId = uuid();

  if (req.cookies.sess_id) {
    res.clearCookie('sess_id');
  }

  const cookieOption = {
    maxAge: 2000 * 60 * 60,
    httpOnly: true,
  };

  req.sessId = sessId;
  req.cookieOption = {
    ...cookieOption,
    expires: new Date(Date.now() + cookieOption.maxAge),
  };

  next();
};
