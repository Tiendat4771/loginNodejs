const User = require('../models/User.js');
module.exports.authentication =  function (req, res, next) {

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
            res.json(user);
        })
    })
};