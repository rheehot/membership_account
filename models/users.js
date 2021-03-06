const passwordHash = require('../utils/passwordHash');

const userModel = (result) => ({
  id: result.id,
  pw: passwordHash(result.pw),
  name: result.name,
  birth: result.birth,
  gender: result.gender,
  email: result.email,
  phone: result.phone,
  favorite: result.favorite,
  reg_date: Date.now(),
});

module.exports = { userModel };
