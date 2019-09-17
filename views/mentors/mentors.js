/* eslint-disable eol-last */
/* eslint-disable consistent-return */
const mentorRouter = require('express').Router();

const mentors = [
  {
    id: 1,
    name: 'Alican',
    expertize: 'JavaScript',
    userType: 'mentor',
  },
  {
    id: 2,
    name: 'Walter',
    expertize: 'Java',
    userType: 'mentor',
  },
  {
    id: 3,
    name: 'Julius',
    expertize: 'C#',
    userType: 'user',
  },
];

// view mentors
mentorRouter.get('/mentors', (req, res) => {
  res.send(mentors);
});

// view Specific mentor
mentorRouter.get('/mentors/:id', (req, res) => {
  // eslint-disable-next-line radix
  const mentor = mentors.find((ment) => ment.id === parseInt(req.params.id));

  if (!mentor) return res.status(404).send('The mentor with that specified ID is not available');
  res.send(mentor);
});

// Admin creating Mentor
mentorRouter.post('/mentors', (req, res) => {
  if (!req.body.name || !req.body.expertize
      || req.body.name.length < 3
      || req.body.expertize.length < 3) {
    return res.status(400).send('Bad Request');
  }
  const mentor = {
    id: mentors.length + 1,
    name: req.body.name,
    expertize: req.body.expertize,
  };

  mentors.push(mentor);

  res.send(mentors);
});

mentorRouter.delete('/mentors/:id', (req, res) => {
  // eslint-disable-next-line radix
  const mentor = mentors.find((ment) => ment.id === parseInt(req.params.id));

  if (!mentor) return res.status(404).send('The mentor with that specified ID is not available');

  const index = mentors.indexOf(mentor);
  mentors.splice(index, 1);

  res.send(mentors);
});

module.exports = mentorRouter;