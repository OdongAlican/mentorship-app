
const mongoose = require( "mongoose" ),

    { Schema } = mongoose,


    sessionModel = new Schema( {
        "name": String,
        "mentor": {
            "type": Schema.Types.ObjectId,
            "ref": "Mentors"
        },
        "start": {
            "type": Date,
            "required": true
        },
        "end": {
            "type": Date,
            "required": true
        }
    } );


module.exports = mongoose.model( "sessions", sessionModel );
