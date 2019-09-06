const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const createSession = require('../utils/createSession');
const users = require('../models/users');
const passwordHash = require('../utils/passwordHash');

const adapter = new FileAsync('db.json');

// temp view render
router.get('/signin', (req, res) => {
  res.render('accounts/signin');
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
 *     "id": "user1",
 *     "password": "qwerty",
 *     "name": "aer4ee",
 *     "birth": "1567601355922",
 *     "gender": "female",
 *     "email": "email@gmail.com",
 *     "phone": "01012345678",
 *     "favorite": "["a","b","c"]",
 *     "payload": {}
 * }
 *
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 * {
 *     "id": "user1",
 *     "name": "aer4ee",
 *     "reg_data": "2018-11-24 14:52:30",
 * }
 */
router.post('/signin', createSession, (req, res) => {
  // 미들웨어에서 넘어온 세션아이디와 옵션을 쿠키에 담아 발행한다.
  res.cookie('sess_id', req.sessId, req.cookieOption);

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
    db.set(`sessions.${req.sessId}`, {
      cookie: req.cookieOption,
      user_id: user.id,
    }).write();
    return db.defaults({ users: {}, sessions: {} }).write();
  });
  // TODO: 에러처리
  res.status(200).json({
    id: user.id,
    name: user.name,
    reg_date: user.reg_date,
  });
});

// 로그인 세션 체크
/**
 * @api {get} /login Get Session
 * @apiName Check Session
 * @apiGroup User
 *
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * @apiFailExample session unexist
 * HTTP/1.1 403 Forbidden
 */
router.get('/login', (req, res, next) => {
  low(adapter).then((db) => {
    const sess = db
      .get('sessions')
      .get(req.cookies.sess_id)
      .value();

    if (sess === undefined) {
      res.render('accounts/login');
      // res.status(403).end();
    } else {
      res.redirect('/');
      // res.status(200).end();
    }
  });
});

// 로그인 post: db query, session create
router.post('/login', createSession, (req, res) => {
  low(adapter).then((db) => {
    const user = db
      .get('users')
      .get(req.body.id)
      .value();
    // 유저아이디 없음
    if (user === undefined) {
      res.status(403).end();
    }
    // 유저아이디는 있으나 비번 틀림
    if (user.password !== passwordHash(req.body.pw)) {
      res.status(403).end();
    } else {
      // TODO: 쿠키발행, 세션디비 저장 로직을 미들웨어로 분리하기
      res.cookie('sess_id', req.sessId, req.cookieOption);
      db.set(`sessions.${req.sessId}`, {
        cookie: req.cookieOption,
        user_id: user.id,
      }).write();
      res.status(200).json({ user_id: user.id });
    }
  });
});

// 유저 조회 (아이디 중복체크)
/**
 * @api {get} /users/id/:id Id Check
 * @apiName Check Id
 * @apiGroup User
 *
 * @apiParam (path) {String} userId
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 204 No Content
 * HTTP/1.1 409 Conflict
 */
router.get('/id/:userId', (req, res) => {
  low(adapter)
    .then((db) => {
      return db
        .get('users')
        .has(req.params.userId)
        .value();
    })
    .then((user) => {
      if (user) {
        res.status(204).end();
      } else {
        res.status(409).end();
      }
    });
});

// 로그아웃 세션 삭제
/**
 * @api {delete} /logout Delete Session
 * @apiName Delete Session
 * @apiGroup User
 *
 * @apiParam (path) {String} userId userId.
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 204 No Content
 */
router.delete('/logout/:userId', (req, res, next) => {
  // TODO: 유저아이디까지 체크하기
  low(adapter)
    .then((db) => {
      const session = db
        .get('sessions')
        .has(req.cookies.sess_id)
        .value();

      if (session) {
        db.unset(`sessions.${req.cookies.sess_id}`).write();
        res.clearCookie('sess_id');
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
