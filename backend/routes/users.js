const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const users = require('../models/users');
const passwordHash = require('../utils/passwordHash');

const adapter = new FileAsync('db.json');

// 유저 조회 (아이디 중복체크)
/**
 * @api {get} /users/id/:id Id Check
 * @apiName Id Check
 * @apiGroup User
 *
 * @apiParam (path) {String} userId
 * @apiSuccessExample unused id
 * HTTP/1.1 200 OK
 * @apiFailExample used id
 * HTTP/1.1 409 Conflict
 */
router.get('/id/:id', (req, res) => {
  low(adapter).then((db) => {
    const user = db
      .get('users')
      .find({ id: req.params.id })
      .value();

    if (user === undefined) {
      res.status(200).end();
    } else {
      res.status(409).end();
    }
  });
});

router.get('/signin', (req, res) => {
  res.render('accounts/signin', { title: '회원가입' });
});

// 회원가입 - 유저 등록
/**
 * @api {post} /users/signin Create User
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiParam {Json} body body.
 * @apiParamExample {json} User Action:
 * {
 *     "user_id": "user1",
 *     "password": "qwerty",
 *     "name": "aer4ee",
 *     "birth": "1567601355922",
 *     "gender": "female",
 *     "email": "email@gmail.com",
 *     "phone": "01012345678",
 *     "favorite": ["a","b","c"],
 *     "payload": {}
 * }
 *
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 */
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
    db.set(`sessions.${req.session.id}`, req.session).write();
    return db.defaults({ users: {}, sessions: {} }).write();
  });

  req.session.userid = req.body.id;
  req.session.save(() => {
    res.redirect('/');
  });
});

// 로그인 get: view rendering, session db query
router.get('/login', (req, res) => {
  low(adapter).then((db) => {
    db.get('sessions').find();
  });
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
  res.redirect('/');
});

module.exports = router;
