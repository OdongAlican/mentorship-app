/* eslint-disable no-constant-condition */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
const mentorRouter = require('express').Router();
const mentorController = require('../../controllers/mentorController');

mentorRouter.route('/mentors')
  .get(mentorController.get)
  .post(mentorController.post);

mentorRouter.route('/mentors/:id')
  .get(mentorController.getOne)
  .put(mentorController.update)
  .delete(mentorController.delete);

module.exports = mentorRouter;