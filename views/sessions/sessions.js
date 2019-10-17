/* eslint-disable consistent-return */
/* eslint-disable indent */
const express = require('express');
const sessionController = require('../../controllers/sessionController');

const sessionRouter = express.Router();
sessionRouter.param('id', sessionController.params);


sessionRouter.route('/mentorshipsessions')
.get(sessionController.get)
.post(sessionController.post);

sessionRouter.route('/mentorshipsessions/:id')
.put(sessionController.put)
.delete(sessionController.delete)
.get(sessionController.getOne);

module.exports = sessionRouter;
