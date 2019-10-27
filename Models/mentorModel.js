/* eslint-disable one-var */
const mongoose = require( "mongoose" ),

    { Schema } = mongoose;

const mentorSchema = new Schema( {
    "name": {
        "type": String,
        "min": 3,
        "required": true
    },
    "expertize": {
        "type": String,
        "min": 3,
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
