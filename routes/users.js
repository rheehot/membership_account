const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const users = require('../models/users');

const adapter = new FileAsync('db.json');

// 회원가입
/**
 * @api {post} /users Create User
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
 * @apiSuccessExample {json} Success:
 * HTTP/1.1 200 OK
 * {
 *     "id": 1,
 *     "user_id": "user1",
 *     "pw": "qwerty",
 *     "reg_date": "2018-11-24 14:52:30"
 * }
 */

low(adapter)
  .then((db) => {
    router.post('/posts', (req, res) => {
      const user = users.convertToUser(req.body);
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

module.exports = router;
