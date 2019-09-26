/* eslint-disable consistent-return */
/* eslint-disable indent */
const express = require('express');
const sessionController = require('../../controllers/sessionController');

const sessionRouter = express.Router();


// creating mentorship session
sessionRouter.route('/mentorshipsessions')
.post(sessionController.post)
.get(sessionController.get);

sessionRouter.route('/mentorshipsessions/:id')
.put(sessionController.put)
.delete(sessionController.delete)
.get(sessionController.getOne);

module.exports = sessionRouter;
