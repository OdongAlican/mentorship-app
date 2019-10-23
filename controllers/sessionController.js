const mentorModel = require('../Models/mentorModel');
const SessionModel = require('../Models/SessionModel');
const _ = require('lodash');

exports.params = function (req, res, next, id) {
  SessionModel.findById(id)
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
  SessionModel.find({})
    .populate('mentor')
    .exec()
    .then((sessions) => {
      res.json(sessions);
    }, (err) => {
      res.send(err);
    });
};

exports.getOne = function (req, res) {
  const session = req.session;

  res.json(session);
};

exports.delete = function (req, res) {
  SessionModel.remove((req.session), (err, removed) => {
    if (err) {
      res.status(400).send('session not updated');
    } else {
      res.json(removed);
    }
  });
};


exports.post = function (req, res) {
  
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

exports.update = function (req, res) {
  const newMentorId = req.params.mentorId;
  const sessionsId = req.params.sessionId;  
  const newSession = req.body

  SessionModel.findOne({_id: sessionsId}, function (err, session) {
    if (err) return err;
  
  mentorModel.findById(newMentorId)
  .then(newMentor => {
      if (!newMentor) return res.status(400).send('No mentor with that Particular id');
        
      session.mentor = newMentor;

    _.merge(session, newSession);

      session.save((err, saved) => {
        if (err) return err

        res.json(saved) 
      })      
  })
  });
}