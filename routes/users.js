const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const createSession = require('../utils/createSession');
const users = require('../models/users');
const passwordHash = require('../utils/passwordHash');

const adapter = new FileAsync('db.json');

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
 *     "pw": "qwerty",
 *     "name": "aer4ee",
 *     "birth": "1567601355922",
 *     "gender": "female",
 *     "email": "email@gmail.com",
 *     "phone": "01012345678",
 *     "favorite": "a,b,c",
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 204 No Content
 */
router.post('/signin', createSession, (req, res, next) => {
  const user = users.userModel(req.body);

  low(adapter)
    .then((db) => {
      db.set(`users.${user.id}`, user).write();
      db.set(`sessions.${req.sessId}`, {
        cookie: req.cookieOption,
        user_id: user.id,
      }).write();
    })
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      next(err);
    });
});

// 로그인 세션 체크
/**
 * @api {get} /users/login Get Session
 * @apiName Check Session
 * @apiGroup User
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200
 * {
 *    id:'user1'
 * }
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 204 NO Content
 */
router.get('/login', (req, res, next) => {
  low(adapter)
    .then((db) => {
      return db
        .get('sessions')
        .get(req.cookies.sess_id)
        .value();
    })
    .then((session) => {
      if (session) {
        res.status(200).send({ id: session.user_id });
      } else {
        res.status(204).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

// 로그인 - 유저 체크, 세션 생성
/**
 * @api {post} /users/login Check User Create Session
 * @apiName CreateSession
 * @apiGroup User
 *
 * @apiParam {Json} body body.
 * @apiParamExample {json} User Action:
 * {
 *     "id": "user1",
 *     "pw": "qwerty",
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * { status: 'login sucsess' }
 * @apiErrorExample Error-Response:
 * HTTP/1.1 204 No Content
 */
router.post('/login', createSession, (req, res, next) => {
  low(adapter)
    .then((db) => {
      const user = db
        .get('users')
        .get(req.body.id)
        .value();

      if (user === undefined || user.pw !== passwordHash(req.body.pw)) {
        res.status(204).end();
      } else {
        db.set(`sessions.${req.sessId}`, {
          cookie: req.cookieOption,
          user_id: user.id,
        }).write();

        res.status(200).send({ status: 'login sucsess' });
      }
    })
    .catch((err) => {
      next(err);
    });
});

// 유저 조회 (아이디 중복체크)
/**
 * @api {get} /users/id/:id Id Check
 * @apiName Check Id
 * @apiGroup User
 *
 * @apiParam (path) {String} userId
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  status:'unused ID'
 * }
 * @apiErrorExample Error-Response:
 * HTTP/1.1 204 No Content
 */
router.get('/id/:userId', (req, res, next) => {
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
        res.status(200).send({ status: 'unused ID' });
      }
    })
    .catch((err) => {
      next(err);
    });
});

// 로그아웃 세션 삭제
/**
 * @api {delete} /users/logout Delete Session
 * @apiName Delete Session
 * @apiGroup User
 *
 * @apiParam (path) {String} userId userId.
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 204 No Content
 */
router.delete('/logout', (req, res, next) => {
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
