'use strict'

const express = require('express');
const router = express.Router();
const { User } = require('../../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  if (req.session.user) {
    res.json(req.session.user.id);
  } else {
    res.json(null);
  }
})

router.post('/login', (req, res, next) => {
  User.comparePassword(req.body.username, req.body.password)
  .spread((user, compareResult) => {
    if (compareResult === true) {
      req.session.user = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  })
  .catch(next);
})

router.delete('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) { next(err) }
    else { res.sendStatus(200); }
  })
})

router.post('/signup', function (req, res, next) {
  User.findOne({ where: { username: req.body.username }})
  .then(user => {
    if (!user) {
      return User.build({
        username: req.body.username,
      })
    } else {
      throw new Error('user already exists');
    }
  })
  .then(user => {
    return Promise.all([user, User.hashPassword(req.body.password)]);
  })
  .spread((user, password) => {
    user.password = password;
    return user.save();
  })
  .then(user => {
    req.session.user = user;
    res.json(user.id);
  })
  .catch(next);
})
