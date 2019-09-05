const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const users = require('../models/users');
const passwordHash = require('../utils/passwordHash');

const adapter = new FileAsync('db.json');

// 회원가입 get : view rendering
router.get('/signin', (req, res) => {
  res.render('accounts/signin', { title: '회원가입' });
});
// 회원가입 post : db query, session create
router.post('/signin', (req, res) => {
  const user = users.userModel({
    id: req.body.id,
    password: passwordHash(req.body.password),
    name: req.body.name,
    birth: req.body.birth,
    gender: req.body.gender,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  });
  // TODO: 디비 쿼리 로직 분리
  low(adapter).then((db) => {
    db.set(`users.${user.id}`, user).write();
    return db.defaults({ users: {} }).write();
  });

  req.session.userid = req.body.id;
  req.session.save(() => {
    res.redirect('/');
  });
});

// 로그인 get: view rendering, session db query
router.get('/login', (req, res) => {
  res.render('accounts/login', { title: '로그인' });
});

// 로그인 post: db query, session create
router.post('/login', (req, res) => {
  res.redirect('/');
});

// 로그아웃 get : view rendering, session destroy
router.get('/logout', (req, res) => {
  req.session.destroy();
  console.log('session을 삭제하였습니다.');
  // req.logout();
  res.redirect('/');
});

module.exports = router;
