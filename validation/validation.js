const Joi = require( "@hapi/joi" ),
    validateMentor = ( data ) => {
        const schema = {
            "name": Joi.string().min( 6 ).required(),
            "expertize": Joi.string().min( 6 ).max( 40 )
        };

        return Joi.validate( data, schema );
    },

    validateUser = ( data ) => {
        const schema = {
            "firstName": Joi.string().min( 6 ).required(),
            "lastName": Joi.string().min( 6 ).max( 40 ),
            "password": Joi.string().min( 6 ).max( 1024 )
        };

        return Joi.validate( data, schema );
    },

    validateSession = ( data ) => {
        const schema = {
            "name": Joi.string().min( 6 ).required(),
            "start": Joi.string().min( 6 ).max( 40 ),
            "end": Joi.string().min( 6 ).max( 1024 )
        };

        return Joi.validate( data, schema );
    },

    userLogin = ( data ) => {
        const schema = {
            "lastName": Joi.string().min( 6 ).max( 40 ),
            "password": Joi.string().min( 6 ).max( 1024 )
        };

        return Joi.validate( data, schema );
    },
    mentorLogin = ( data ) => {
        const schema = {
            "name": Joi.string().min( 6 ).required(),
            "expertize": Joi.string().min( 6 ).max( 40 )
        };

        return Joi.validate( data, schema );
    }

module.exports.validateMentor = validateMentor;
module.exports.validateUser = validateUser;
module.exports.validateSession = validateSession;
module.exports.userLogin = userLogin;
module.exports.mentorLogin = mentorLogin;


