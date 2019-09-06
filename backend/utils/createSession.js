const uuid = require('uuid/v1');

module.exports = function (req, res, next) {
  // 세션 아이디를 생성한다.
  const sessId = uuid();

  // 이미 존재하는 쿠키를 지운다.
  if (req.cookies.sess_id) {
    res.clearCookie('sess_id');
  }
  // 쿠키 옵션을 설정
  const cookieOption = {
    maxAge: 2000 * 60 * 60,
    httpOnly: true,
  };
  // 쿠키에 담을 세션아이디와 쿠키 옵션을 request에 담아 넘긴다.
  req.sessId = sessId;
  req.cookieOption = {
    ...cookieOption,
    expires: new Date(Date.now() + cookieOption.maxAge),
  };
  next();
};
