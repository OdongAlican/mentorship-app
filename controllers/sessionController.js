/* eslint-disable no-shadow */
const mentorModel = require( "../Models/mentorModel" );
const SessionModel = require( "../Models/SessionModel" );
const _ = require( "lodash" );
const { validateSession } = require( "../validation/validation" );

exports.params = async function( req, res, next, id ) {
    await SessionModel.findById( id )
        .populate( "mentor" )
        .exec()
        .then( ( session ) => {
            if ( !session ) {
                res.status( 400 ).send( "No session with that Particular id" );
            } else {
                req.session = session;
                next();
            }
        }, ( err ) => {
            res.status( 400 ).send( "No session with that Particular id" );

            res.send( err );
        } );
};

exports.get = async function( req, res ) {
    await SessionModel.find( {} )
        .populate( "mentor" )
        .exec()
        .then( ( sessions ) => {
            res.json( sessions );
        }, ( err ) => {
            res.send( err );
        } );
};

exports.getOne = async function( req, res ) {
    const session = await req.session;

    res.json( session );
};

exports.delete = async function( req, res ) {
    await SessionModel.remove( ( req.session ), ( err, removed ) => {
        if ( err ) {
            res.status( 400 ).send( "session not updated" );
        } else {
            res.json( removed );
        }
    } );
};

exports.post = async function( req, res ) {
    const { error } = validateSession( req.body );

    if( error ) {
        return res.status( 400 ).send( error.details[ 0 ].message )
        ;
    }

    const mentorId = await req.params.userId,
        mentorObject = await req.body,
        newSession = new SessionModel( mentorObject );

    await mentorModel.findOne( { "_id": mentorId }, async( err, foundMentor ) => {
        if ( !foundMentor ) {
            return err;
        }
        foundMentor.sessions.push( newSession );
        newSession.mentor = foundMentor;
        await newSession.save( ( err, savedSession ) => {
            if ( err ) {
                return err;
            }
            res.json( savedSession );
        } );
        await foundMentor.save( ( err ) => {
            if ( err ) {
                return err;
            }
        } );
    } );

};

exports.update = function( req, res ) {
    const { error } = validateSession( req.body );

    if( error ) {
        return res.status( 400 ).send( error.details[ 0 ].message );
    }
    
    const newMentorId = req.params.mentorId,
        sessionsId = req.params.sessionId,
        newSession = req.body;

    SessionModel.findOne( { "_id": sessionsId }, ( err, session ) => {
        if ( !session ) {
            return err;
        }
        const oldMentorID = session.mentor._id;

        mentorModel.findById( oldMentorID )
            .then( ( oldMentor ) => {
                if ( !oldMentor ) {
                    return res.status( 400 ).send( "No mentor with that Particular id" );
                }

                let index = oldMentor.sessions.indexOf( sessionsId );

                if ( index > -1 ) {
                    oldMentor.sessions.splice( index, 1 );
                }

                oldMentor.save( ( err ) => {
                    if( err ) {
                        return err;
                    }
                } );
            } );
          
        mentorModel.findById( newMentorId )
            .then( ( newMentor ) => {
                if ( !newMentor ) {
                    return err;
                }
                newMentor.sessions.push( session );
                newMentor.save( ( err ) => {
                    if( err ) {
                        return err;
                    }
                } );
                session.mentor = newMentor;
                _.merge( session, newSession );
                session.save( ( err, saved ) => {
                    if ( err ) {
                        return err;
                    }
                    res.json( saved );
                } );
            } );
    } );
};
