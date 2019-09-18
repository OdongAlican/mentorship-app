/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const userRouter = require('express').Router();

const users = [
  {
    id: 1,
    firstName: 'Alican',
    lastName: 'Odong',
    password: 12345,
  },
  {

    id: 2,
    firstName: 'Jackson',
    lastName: 'Ssenyonjjo',
    password: 12345,
  },
  {

    id: 3,
    firstName: 'Markus',
    lastName: 'Peter',
    password: 54321,
  },
  {

    id: 4,
    firstName: 'Markusy',
    lastName: 'Raskol',
    password: 54321,
  },
];

// get all users or user sign up
userRouter.route('/users')
  .get((req, res) => {
    res.send(users);
  })
  .post((req, res) => {
    if (req.body.password.length < 5
    || req.body.lastName.length < 3
    || req.body.firstName < 3
    || !req.body.password
    || !req.body.firstName
    || !req.body.lastName) {
      return res.status(404).send('Bad Request');
    }

    const user = {
      id: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,

    };

    users.push(user);
    res.send(users);
  });

// user can login
userRouter.post('/auth/login', (req, res) => {
  const { firstName, password } = req.body;
  if (firstName && password) {
    const result = users.find((user) => user.firstName == firstName && user.password == password);
    if (!result) return res.status(404).send('Password or username is incorrect');
    res.send(result);
  } else {
    res.status(400).send('Please Enter user name or Password');
  }
});

module.exports = userRouter;
