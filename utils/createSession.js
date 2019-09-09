const uuid = require('uuid/v1');

/**
 * Creates Session and generates cookie
 *
 * @param {object,object,function} request, response, next
 * @return {} No return
 */

module.exports = async function (req, res, next) {
  const sessId = uuid();

  if (req.cookies.sess_id) {
    res.clearCookie('sess_id');
  }

  const cookieOption = {
    maxAge: 2000 * 60 * 60,
    httpOnly: true,
  };

  req.sessId = await sessId;
  req.cookieOption = await {
    ...cookieOption,
    expires: new Date(Date.now() + cookieOption.maxAge),
  };

  res.cookie('sess_id', req.sessId, req.cookieOption);

  next();
};
