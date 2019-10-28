
const _ = require( "lodash" );
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

    const newMentor = await req.body;

    await mentorModel.create( newMentor )
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

    const user = await mentorModel.findOne( { "lastName": req.body.lastName } );
    if( !user ) {
        return res.status( 400 ).send( "Name not correct" );
    }
    const validPassword = await bcrypt.compare( req.body.password, user.password );
    if( !validPassword ) {
        return res.status( 400 ).send( "Password not correct" );
    }
    
    res.send( "Logged In" );
};
