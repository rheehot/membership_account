const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const users = require('../models/users');
const passwordHash = require('../utils/passwordHash');

const adapter = new FileAsync('db.json');

// 유저 정보 가져오기
/**
 * @api {get} /users/:userId Get User
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam (path) {Number} userId userId.
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *     "user_id": 1,
 *     "id": "user1",
 *     "password": "qwerty",
 *     "nickname": "hello",
 *     "image": "image1",
 *     "background": "image2"
 *     "reg_date": "2018-11-24 14:52:30"
 * }
 */
router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;

  user
    .getUser(userId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      next(err);
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
 *     id: 'user1',
 *     password: 'Qwerty1!',
 *     name: '김철수',
 *     birth: 'result.birth',
 *     gender: result.gender,
 *     email: result.email,
 *     phone: result.phone,
 *     favorite: result.favorite,
 * }
 *
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *     "user_id": 1,
 *     "id": "user1",
 *     "pw": "qwerty",
 *     "reg_date": "2018-11-24 14:52:30"
 * }
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
    return db.defaults({ users: {} }).write();
  });

  req.session.userid = req.body.id;
  req.session.save(() => {
    // res.status(200).json(user);
    res.redirect('#a');
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
  res.redirect('/');
});

module.exports = router;
