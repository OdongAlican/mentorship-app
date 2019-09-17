/* eslint-disable consistent-return */
/* eslint-disable indent */
const express = require('express');

const sessionRouter = express.Router();

const mentorshipSessions = [
  {
    id: 1,
    title: 'JavaScript',
    day: 'Monday',
    sessionStatus: 'Pending',
  },
];


// creating mentorship session
sessionRouter.post('/mentorshipsessions', (req, res) => {
  if (!req.body.title || req.body.title.length < 3
      || !req.body.day || req.body.day.length < 3) {
    return res.status(400).send('Bad Request');
  }
  const mentorshipSession = {
    id: mentorshipSessions.length + 1,
    title: req.body.title,
    day: req.body.day,
    sessionStatus: req.body.sessionStatus,
  };

  mentorshipSessions.push(mentorshipSession);

  res.send(mentorshipSessions);
});


sessionRouter.put('/mentorshipsessions/:id', (req, res) => {
  // eslint-disable-next-line radix
  const mentorshipSession = mentorshipSessions.find((sess) => sess.id === parseInt(req.params.id));

  if (!mentorshipSessions) return res.status(404).send('The session with that ID is not available');

  mentorshipSession.sessionStatus = req.body.sessionStatus;

  res.send(mentorshipSessions);
});

module.exports = sessionRouter;
