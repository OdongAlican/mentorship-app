
const _ = require('lodash');
const mentorModel = require('../Models/mentorModel');
const SessionModel = require('../Models/sessionModel');

exports.params = function (req, res, next, id) {
  mentorModel.findById(id)
    .populate('sessions')
    .exec()
    .then((mentor) => {
      if (!mentor) {
        res.status(400).send('There is no mentor with that id');
      } else {
        req.mentor = mentor;
        next();
      }
    }, (err) => {
      res.status(400).send('There is no mentor with that id');
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

exports.newMentorSessions = function (req, res) {
  
  const mentorId = req.params.userId;

  const newSession = new SessionModel(req.body);
  

  mentorModel.findOne({_id: mentorId}, function (err, foundMentor) {
    if (err) return err;

    foundMentor.sessions.push(newSession);
    newSession.mentor = foundMentor
    newSession.save(function (err, savedSession) {
      if (err) return err;
      res.json(savedSession)
    })
    foundMentor.save(function (err) {
      if (err) return err;
    });
  });

};

exports.updateSession = function(req, res){
  
  var mentorId = req.params.userId;
  var sessionId = req.params.sessionId;

  mentorModel.findOne({_id: mentorId}, function (err, foundMentor) {
    if(err) return err;

    var foundSession = foundMentor.sessions.id(sessionId);

    const updateSession = req.body;

    _.merge(updateSession, foundSession);

    foundMentor.save(function (err, savedUser) {
      res.json(foundSession);
    });
  });
}
