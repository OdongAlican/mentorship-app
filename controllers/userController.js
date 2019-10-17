/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/order */
/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
const userModel = require('../Models/userModel');
const _ = require('lodash');

exports.params = function (req, res, next, id) {
  userModel.findById(id)
    .then((user) => {
      if (!user) {
        res.status(400).send('No user with that Particular id');
      } else {
        req.user = user;
        next();
      }
    }, (err) => {
      res.status(400).send('No user with that Particular id');

      res.send(err);
    });
};

exports.get = function (req, res) {
  userModel.find({})
    .then((users) => {
      res.json(users);
    }, (err) => {
      res.send(err);
    });
};

exports.post = function (req, res) {
  const newUser = req.body;

  userModel.create(newUser)
    .then((user) => {
      res.json(user);
    }, (err) => {
      res.send(err);
    });
};

exports.getOne = function (req, res) {
  const user = req.user;

  res.json(user);
};

exports.delete = function (req, res) {
  userModel.remove((req.user), (err, removed) => {
    if (err) {
      res.status(400).send('user not updated');
    } else {
      res.json(removed);
    }
  });
};

exports.put = function (req, res) {
  const user = req.user;

  const updateUser = req.body;

  _.merge(user, updateUser);

  user.save((err, saved) => {
    if (err) {
      res.status(400).send('user not updated');
    } else {
      res.json(saved);
    }
  });
};
