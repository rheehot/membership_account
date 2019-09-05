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

// 회원가입 post시 유저정보를 디비에 저장, 세션, 쿠키 생성, 로그인 성공 메인페이지로 리다이렉트
low(adapter)
  .then((db) => {
    router.post('/posts', (req, res) => {
      const user = users.userModel(req.body);
      db.get('users')
        .push(user)
        .write();
    });
  })
  .then(() => {
    router.get('/signin', (req, res) => {
      res.render('accounts/signin');
    });
  });

router.post('/signin', (req, res) => {
  const User = users.userModel({
    username: req.body.username,
    password: passwordHash(req.body.password),
    displayname: req.body.displayname,
  });
  User.save((err) => {
    res.send(
      '<script>alert("회원가입 성공");location.href="/accounts/login";</script>',
    );
  });
});

// 로그인 세션 검사하여 통과하면 성공 메인페이지로 리다이렉트
// or 세션 검사 실패, 로그인하면
router.get('/login', (req, res) => {
  res.render('accounts/login', { title: '로그인' });
});

module.exports = router;
