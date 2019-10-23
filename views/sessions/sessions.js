/* eslint-disable consistent-return */
/* eslint-disable indent */
const express = require('express');
const sessionController = require('../../controllers/sessionController');

const sessionRouter = express.Router();
sessionRouter.param('id', sessionController.params);


sessionRouter.route('/mentorshipsessions')
.get(sessionController.get)

sessionRouter.route('/mentorshipsessions/:id')
.delete(sessionController.delete)
.get(sessionController.getOne);

sessionRouter.route('/mentors/:userId/sessions')
.post(sessionController.post);

sessionRouter.route('/mentors/:mentorId/sessions/:sessionId')
.put(sessionController.update);


module.exports = sessionRouter;
