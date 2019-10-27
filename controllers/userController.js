
const userModel = require( "../Models/userModel" );
const _ = require( "lodash" );
const bcrypt = require("bcryptjs");
const { validateUser } = require( "../validation/validation" );

exports.params = async function( req, res, next, id ) {
    await userModel.findById( id )
        .then( ( user ) => {
            if ( !user ) {
                res.status( 400 ).send( "No user with that Particular id" );
            } else {
                req.user = user;
                next();
            }
        }, ( err ) => {
            res.status( 400 ).send( "No user with that Particular id" );

            res.send( err );
        } );
};

exports.get = async function( req, res ) {
    await userModel.find( {} )
        .then( ( users ) => {
            res.json( users );
        }, ( err ) => {
            res.send( err );
        } );
};

exports.post = async function( req, res ) {
    const { error } = validateUser( req.body );

    if( error ) {
        return res.status( 404 ).send( error.details[ 0 ].message );
    }

    const salt = await bcrypt.genSalt(10),
        hashPassword = await bcrypt.hash(req.body.password, salt);

    await userModel.create( {
        "firstName":req.body.firstName,
        "lastName":req.body.lastName,
        "password":hashPassword
    } )
        .then( ( user ) => {
            res.json( user );
        }, ( err ) => {
            res.send( err );
        } );
};

exports.getOne = async function( req, res ) {
    const user = await req.user;

    res.json( user );
};

exports.delete = async function( req, res ) {
    await userModel.remove( ( req.user ), ( err, removed ) => {
        if ( err ) {
            res.status( 400 ).send( "user not updated" );
        } else {
            res.json( removed );
        }
    } );
};

exports.put = async function( req, res ) {
    const { error } = validateUser( req.body );

    if( error ) {
        return res.status( 404 ).send( error.details[ 0 ].message );
    }
    
    const user = await req.user,
        updateUser = await req.body;

    _.merge( user, updateUser );

    await user.save( ( err, saved ) => {
        if ( err ) {
            res.status( 400 ).send( "user not updated" );
        } else {
            res.json( saved );
        }
    } );
};
