const express = require('express');
const router = express.Router();
const low = require('lowdb');
const uuid = require('uuid/v1');
const FileAsync = require('lowdb/adapters/FileAsync');
const createSession = require('../utils/createSession');
const users = require('../models/users');
const passwordHash = require('../utils/passwordHash');

const adapter = new FileAsync('db.json');

// 유저 조회 (아이디 중복체크)
/**
 * @api {get} /users/id/:id Id Check
 * @apiName Check Id
 * @apiGroup User
 *
 * @apiParam (path) {String} userId
 * @apiSuccessExample Unused Id
 * HTTP/1.1 200 OK
 * @apiFailExample Used Id
 * HTTP/1.1 409 Conflict
 */
router.get('/id/:id', (req, res) => {
  low(adapter).then((db) => {
    const user = db
      .get('users')
      .has(req.params.id)
      .value();

    if (user) {
      res.status(200).end();
    } else {
      res.status(409).end();
    }
  });
});

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
  // 미들웨어에서 넘어온 세션아이디와 옵션을 쿠키에 담아 생성한다.
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
    // 유저 데이터 저장
    db.set(`users.${user.id}`, user).write();
    // 세션 데이터 저장
    db.set(`sessions.${req.sessId}`, {
      cookie: req.cookieOption,
      user_id: user.id,
    }).write();
    return db.defaults({ users: {}, sessions: {} }).write();
  });
  res.status(200).send('');
});

// 로그인 세션 체크
/**
 * @api {get} /login Get Session
 * @apiName Check Session
 * @apiGroup User
 *
 * @apiParam no param
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 */
router.get('/login', (req, res) => {
  if (req.session.user_id) {
    console.log('세션확인');
    res.redirect('/');
  } else {
    console.log('세션없음');
    res.render('accounts/login');
  }
  // low(adapter).then((db) => {
  //   // 디비에서 세션 찾고 하려면 express-session 모듈 쓸수가 없다..
  //   const sess = db.get('sessions').get(req.session.id);
  //   if (sess === undefined) {
  //     res.status(403).end();
  //   } else {
  //     res.status(200).json(sess);
  //   }
  // });
});

// 로그인 post: db query, session create

router.post('/login', (req, res) => {
  low(adapter).then(async (db) => {
    const user = db
      .get('users')
      .get(req.body.id)
      .value();
    console.log(user);
    if (user.password === passwordHash(req.body.pw)) {
      // 세션발행
      req.session.user_id = user.id;
      req.session.user_name = user.name;
      req.session.regenerate((err) => {
        console.log(req.session);
      });
      // 세션디비 저장
      db.set(`sessions.${req.session.id}`, req.session).write();
      res.redirect('/');
    } else {
      console.log('비번틀림');
      res.end();
    }
  });
});

// 로그아웃 get : view rendering, session destroy
router.get('/logout', (req, res) => {
  res.clearCookie('sess_id');
  // req.session.destroy();
  console.log('session을 삭제하였습니다.');
  res.redirect('/');
});

module.exports = router;
