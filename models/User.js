const mongoose = require('mongoose');

//import bcrypt 
var bcrypt = require('bcrypt');
//Difine Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email : {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

// bcrypt pre save
const saltRounds = 10;
UserSchema.pre('save', function ( next ){
    const user = this;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if( err ) { return next(err);}
        bcrypt.hash(user.password, salt, function(err, hash) {
            // Store hash in your password DB.
            user.password = hash;
            next();

        });

    });

})

// bcrypt.compare('dsdass', hash,  function( err, res ){
//     // if( err ) { return calllback(err)};
//     console.log(res);
// });


// UserSchema.methods.comparePassword = function( candidatePassword, calllback ){
    // bcrypt.compare(hash, this.password, function( err, res ){
    //     // if( err ) { return calllback(err)};
    //     console.log(res);
    //     // calllback(null, isMatch)
    // })
// }


// Create a modle
const User = mongoose.model('userAuthenticaton', UserSchema);



module.exports = User;
