const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const app = express();
// import router file

const router = require('./router');

//connect mongoose 
mongoose.connect('mongodb://localhost/authentication', function(err){
    if(err) { `error`}
    console.log('connect success ');
})



//set up middleware
app.use(bodyParser.json({ type: '*/*'}));

//run router
router(app);


// define env port
const port = process.env.PORT || 5000;

app.listen(port);

console.log(`Rungning server on port ${port}`);
