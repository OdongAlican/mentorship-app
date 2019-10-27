/* eslint-disable no-console */
/* eslint-disable one-var */
const express = require( "express" );
const bodyParser = require( "body-parser" );
const app = express();

const dotenv = require( "dotenv" );
const mongoose = require( "mongoose" );

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { "useNewUrlParser": true },
    () => console.log( "connected to Database!" ) );


app.use( bodyParser.urlencoded( { "extended": true } ) );
app.use( bodyParser.json() );

const sessionRouter = require( "./views/sessions/sessions" );
const mentorRouter = require( "./views/mentors/mentors" );
const userRouter = require( "./views/users/users" );

app.use( "/api", sessionRouter );
app.use( "/api", mentorRouter );
app.use( "/api", userRouter );


const PORT = process.env.PORT || 3000;

app.listen( PORT, () => {
    console.log( `App running on port ${PORT}` );
} );

module.exports = app;
