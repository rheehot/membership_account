const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('세션아이디', req.session.id);
  console.log('세션', req.session.userid);

  res.render('index', { title: 'home' });
});

module.exports = router;
