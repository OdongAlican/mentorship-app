/* eslint-disable no-constant-condition */
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

// view mentors and Admin creating Mentor
mentorRouter.route('/mentors')
  .get((req, res) => {
    res.send(mentors);
  })
  .post((req, res) => {
    if (!req.body.name || !req.body.expertize
        || req.body.name.length < 3
        || req.body.expertize.length < 3) {
      return res.status(400).send('Bad Request');
    }
    const mentor = {
      id: mentors.length + 1,
      name: req.body.name,
      expertize: req.body.expertize,
      userType: req.body.userType,
    };

    mentors.push(mentor);

    res.send(mentors);
  });

// view Specific mentor or delete mentor
mentorRouter.route('/mentors/:id')
  .get((req, res) => {
  // eslint-disable-next-line radix
    const mentor = mentors.find((ment) => ment.id === parseInt(req.params.id));

    if (!mentor) return res.status(404).send('The mentor with that specified ID is not available');
    res.send(mentor);
  })
  .delete((req, res) => {
  // eslint-disable-next-line radix
    const mentor = mentors.find((ment) => ment.id === parseInt(req.params.id));

    if (!mentor) return res.status(404).send('The mentor with that specified ID is not available');

    const index = mentors.indexOf(mentor);
    mentors.splice(index, 1);

    res.send(mentors);
  })
  .put((req, res) => {
    // eslint-disable-next-line radix
    const mentor = mentors.find((ment) => ment.id === parseInt(req.params.id));

    if (!mentor) return res.status(404).send('There is user with that ID');

    /*
      Updating only one property in the mentor object
    */
    if (req.body.expertize && !req.body.name && !req.body.userType) {
      mentor.expertize = req.body.expertize;
    }

    if (!req.body.expertize && req.body.name && !req.body.userType) {
      mentor.name = req.body.name;
    }

    if (!req.body.expertize && !req.body.name && req.body.userType) {
      mentor.userType = req.body.userType;
    }

    /*
      Updating two properties in the mentor object
    */

    if (req.body.expertize && !req.body.name && req.body.userType) {
      mentor.expertize = req.body.expertize;
      mentor.userType = req.body.userType;
    }

    if (!req.body.expertize && req.body.name && req.body.userType) {
      mentor.userType = req.body.userType;
      mentor.name = req.body.name;
    }

    if (req.body.expertize && req.body.name && !req.body.userType) {
      mentor.name = req.body.name;
      mentor.expertize = req.body.expertize;
    }

    /*
      Updating all the properties in the mentor object
    */
    if (req.body.name && req.body.expertize
      && req.body.userType) {
      mentor.name = req.body.name;
      mentor.expertize = req.body.expertize;
      mentor.userType = req.body.userType;
    }

    res.send(mentors);
  });

module.exports = mentorRouter;