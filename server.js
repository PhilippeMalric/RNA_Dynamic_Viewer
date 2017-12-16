process.env.NODE_ENV = process.env.NODE_ENV || 'development';



var config = require('./config/config'),
    //mongoose = require('./config/mongoose'),
    express = require('./config/express');

    

var bodyParser = require("body-parser");

var //db = mongoose(),
    app = express();





app.listen(config.port);

module.exports = app;
console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + config.port);

//myUserAdmin:VeqVL94qGqQ%25GGwM@