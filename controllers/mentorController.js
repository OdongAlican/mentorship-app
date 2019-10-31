
const _ = require( "lodash" );
const bcrypt = require( "bcryptjs" ),
    jwt = require("jsonwebtoken");
const mentorModel = require( "../Models/mentorModel" );
const { validateMentor, mentorLogin } = require( "../validation/validation" );

exports.params = async function( req, res, next, id ) {
    await mentorModel.findById( id )
        .populate( "sessions" )
        .exec()
        .then( ( mentor ) => {
            if ( !mentor ) {
                res.status( 400 ).send( "There is no mentor with that id" );
            } else {
                req.mentor = mentor;
                next();
            }
        }, ( err ) => {
            res.status( 400 ).send( "There is no mentor with that id" );
            res.send( err );
        } );
};

exports.get = async function( req, res ) {
    await mentorModel.find( {} )
        .then( ( mentors ) => {
            res.json( mentors );
        }, ( err ) => {
            res.send( err );
        } );
};

exports.post = async function( req, res ) {
    const { error } = validateMentor( req.body );

    if( error ) {
        return res.status( 404 ).send( error.details[ 0 ].message );
    }

    const salt = await bcrypt.genSalt( 10 ),
    hashPassword = await bcrypt.hash( req.body.password, salt );

    await mentorModel.create( {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "expertize": req.body.expertize,
        "password": hashPassword,
        "email": req.body.email
    } )
        .then( ( mentor ) => {
            res.json( mentor );
        }, ( err ) => {
            res.send( err );
        } );
};

exports.getOne = async function( req, res ) {
    const mentor = await req.mentor;

    res.json( mentor );
};

exports.update = async function( req, res ) {
    const { error } = validateMentor( req.body );

    if( error ) {
        return res.status( 404 ).send( error.details[ 0 ].message );
    }
    
    const mentor = await req.mentor,
        updateMentor = await req.body;

    _.merge( mentor, updateMentor );

    await mentor.save( ( err, saved ) => {
        if ( err ) {
            return res.status( 400 ).send( "Mentor not Updated" );
        }

        return res.json( saved );
    } );
};

exports.delete = async function( req, res ) {
    const mentor = await req.mentor;

    await mentor.remove( ( err, removed ) => {
        if ( err ) {
            return res.status( 400 ).send( "No mentor with that ID" );
        }

        return res.json( removed );
    } );
};

exports.login = async function( req, res ) {
    const { error } = mentorLogin( req.body );

    if( error ) {
        return res.status( 404 ).send( error.details[ 0 ].message );
    }

    const mentor = await mentorModel.findOne( { "email": req.body.email } );
    if( !mentor ) {
        return res.status( 400 ).send( "Name not correct" );
    }
    const validPassword = await bcrypt.compare( req.body.password, mentor.password );
    if( !validPassword ) {
        return res.status( 400 ).send( "Password not correct" );
    }

    const token = jwt.sign( { "_id": mentor._id }, process.env.TOKEN_SECRET_MENTOR );

    res.header( "auth_token", token ).send( token );
};
