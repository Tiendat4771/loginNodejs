const User = require('../models/User.js');
const jwt = require('jwt-simple');

// import config using secret key
const config =require('../config/config');

// crete token web json
function tokenUser ( user )  {
    const timestamp = new Date().getTime();
    const token = jwt.encode({ sub:  user.id, iat: timestamp }, config.secretKey);
    return token;
}
exports.signin = function( req, res, next){
    res.send({ token: tokenUser( req.user)});
    // console.log(user);
}
exports.signup =  function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email}, (err, existingUser) => {
        if(err) { return next(err)};

        if( existingUser ) {
            return res.send({ err: 'Email is in user'});
        }
        const user = new User ({
            email: email,
            password: password
        });
        user.save(function( err ){
            if( err ) { return next( err );}
            res.json({token: tokenUser(user)});
        })
    })
};
