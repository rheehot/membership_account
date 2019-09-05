const userModel = (result) => ({
  id: result.id,
  password: result.password,
  name: result.name,
  birth: result.birth,
  gender: result.gender,
  email: result.email,
  phone: result.phone,
  favorite: result.favorite,
  reg_date: Date.now(),
});

module.exports = { userModel };
