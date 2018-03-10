const Authentication = require('./controller/authentication.js');

module.exports = function( app ){
    app.post('/', Authentication.authentication );
}
