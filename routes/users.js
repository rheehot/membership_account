const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const users = require('../models/users');
const passwordHash = require('../utils/passwordHash');

const adapter = new FileAsync('db.json');

// 회원가입 get
router.get('/signin', (req, res) => {
  res.render('accounts/signin', { title: '회원가입' });
});

// // 회원가입 post시 유저정보를 디비에 저장, 세션, 쿠키 생성, 로그인 성공 메인페이지로 리다이렉트
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

// 로그인 세션 검사하여 통과하면 성공 메인페이지로 리다이렉트
// or 세션 검사 실패, 로그인하면
router.get('/login', (req, res) => {
  res.render('accounts/login', { title: '로그인' });
});

router.post('/login', (req, res) => {
  res.redirect('/');
});
// 로그아웃 세션날리기
router.get('/logout', (req, res) => {
  req.session.destroy();
  console.log('session을 삭제하였습니다.');
  // req.logout();
  res.redirect('/');
});

module.exports = router;
