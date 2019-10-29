/* eslint-disable new-cap */

const express = require( "express" );
const sessionController = require( "../../controllers/sessionController" ),
    sessionRouter = express.Router(),
    verify = require("../../verification/userVerification")

sessionRouter.param( "id", sessionController.params );


sessionRouter.route( "/mentorshipsessions" )
    .get( sessionController.get );

sessionRouter.route( "/mentorshipsessions/:id" )
    .delete( sessionController.delete )
    .get( sessionController.getOne );

sessionRouter.route( "/mentors/:userId/sessions" )
    .post( verify, sessionController.post );

sessionRouter.route( "/mentors/:mentorId/sessions/:sessionId" )
    .put( sessionController.update );


module.exports = sessionRouter;
