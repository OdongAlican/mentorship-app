/* eslint-disable one-var */
const { Schema } = require( "mongoose" );
const mongoose = require( "mongoose" );

const userSchema = new Schema( {
    "title": {
    "type": String,
    "required": true
    },
    "firstName": {
        "type": String,
        "required": true
    },
    "lastName": {
        "type": String,
        "required": true
    },
    "email": {
        "type": String,
        "required": true
    },
    "password": {
        "type": String,
        "required": true,
        "max": 1024
    }
} );

module.exports = mongoose.model( "user", userSchema );
