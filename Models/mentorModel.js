/* eslint-disable one-var */
const mongoose = require( "mongoose" ),

    { Schema } = mongoose;

const mentorSchema = new Schema( {
    "firstName": {
        "type": String,
        "min": 5,
        "required": true
    },
    "lastName": {
        "type": String,
        "min": 5,
        "required": true
    },
    "expertize": {
        "type": String,
        "min": 3,
        "required": true
    },
    "password": {
        "type": String,
        "min": 5,
        "required": true
    },
    "email": {
        "type": String,
        "min": 6,
        "required": true
    },
    "sessions": [
        {
            "type": Schema.Types.ObjectId,
            "ref": "sessions"
        }
    ]
}, {
    "usePushEach": true
} );


module.exports = mongoose.model( "Mentors", mentorSchema );
