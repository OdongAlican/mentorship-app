/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/order */
/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
const sessionModel = require('../Models/sessionModel');
const _ = require('lodash');

exports.params = function (req, res, next, id) {
  sessionModel.findById(id)
    .populate('mentor')
    .exec()
    .then((session) => {
      if (!session) {
        res.status(400).send('No session with that Particular id');
      } else {
        req.session = session;
        next();
      }
    }, (err) => {
      res.status(400).send('No session with that Particular id');

      res.send(err);
    });
};

exports.get = function (req, res) {
  sessionModel.find({})
    .populate('mentor')
    .exec()
    .then((sessions) => {
      res.json(sessions);
    }, (err) => {
      res.send(err);
    });
};

exports.post = function (req, res) {
  const newsession = req.body;
  newsession.mentor = req.mentor._id;

  sessionModel.create(newsession)
    .then((session) => {
      res.json(session);
    }, (err) => {
      res.send(err);
    });
};

exports.getOne = function (req, res) {
  const session = req.session;

  res.json(session);
};

exports.delete = function (req, res) {
  sessionModel.remove((req.session), (err, removed) => {
    if (err) {
      res.status(400).send('session not updated');
    } else {
      res.json(removed);
    }
  });
};

exports.put = function (req, res) {
  const session = req.session;

  const updatesession = req.body;

  _.merge(session, updatesession);

  session.save((err, saved) => {
    if (err) {
      res.status(400).send('session not updated');
    } else {
      res.json(saved);
    }
  });
};
