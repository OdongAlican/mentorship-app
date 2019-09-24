/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
/* eslint-disable no-return-assign */
const _ = require('lodash');
const mentorModel = require('../Models/mentorModel');

exports.params = function (req, res, id) {
  mentorModel.findById(id)
    .then((mentor) => {
      if (!mentor) {
        return res.status(400).send('There is no mentor with that id');
      }
      return req.mentor = mentor;
    }, (err) => {
      res.send(err);
    });
};

exports.get = function (req, res) {
  mentorModel.find({})
    .then((mentors) => {
      res.json(mentors);
    }, (err) => {
      res.send(err);
    });
};


exports.post = function (req, res) {
  const newMentor = req.body;

  mentorModel.create(newMentor)
    .then((mentor) => {
      res.json(mentor);
    }, (err) => {
      res.send(err);
    });
};

exports.getOne = function (req, res) {
  const mentor = req.mentor;

  res.json(mentor);
};

exports.update = function (req, res) {
  const mentor = req.mentor;

  const updateMentor = req.body;

  _.merge(mentor, updateMentor);

  mentor.save((err, saved) => {
    if (err) {
      return res.status(400).send('Mentor not Updated');
    }

    return res.json(saved);
  });
};


exports.delete = function (req, res) {
  const mentor = req.mentor;

  mentor.remove((err, removed) => {
    if (err) {
      return res.status(400).send('No mentor with that ID');
    }

    return res.json(removed);
  });
};
