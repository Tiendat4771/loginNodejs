const passport = require('passport');
//import config key scret
const config = require('../config/config');
// import User
const User = require('../models/User');
//import LocalStrategy
const LocalStrategy = require('passport-local').Strategy;
//import passport-jwt
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const localOptions = { usernameField: 'email'};


passport.use(new LocalStrategy (localOptions, function( email, password, done){
    User.findOne({email: email}, function(err, user){
        //Check err
        if (err) { return done(err); }
        //Check username 
        if( !user ) {
            return done( null, false, { message: 'Incorecr username'})
        }
        //check password 
        user.comparePassword( password, function ( err, isMatch){
            if ( err ) { return done(err); }
            console.log(isMatch);
            if ( !isMatch) { return done( null, false, { message: " flase"});}
            return done( null, user, { message: true});
        });
    });
}));

const options = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secretKey
}

passport.use( new JwtStrategy( options, function( jwt_payload, done){
    User.findById(jwt_payload.sub, function(err, user){
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}))
