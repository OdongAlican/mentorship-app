
const mongoose = require( "mongoose" ),

    { Schema } = mongoose,


    sessionModel = new Schema( {
        "name": String,
        "mentor": {
            "type": Schema.Types.ObjectId,
            "ref": "Mentors"
        },
        "start": {
            "type": String,
            "required": true
        },
        "end": {
            "type": String,
            "required": true
        }
    } );


module.exports = mongoose.model( "sessions", sessionModel );
