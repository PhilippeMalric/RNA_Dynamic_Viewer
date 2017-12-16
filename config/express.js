var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser');
var favicon = require('serve-favicon')
module.exports = function() {
    var app = express();
	app.use(favicon('public/img/favicon-96x96.png'))

    app.use(bodyParser.json({limit: "50mb"}));
    app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');
	
    require('../app/routes/index.server.routes.js')(app);
    //require('../app/routes/users.server.routes.js')(app);

    app.use(express.static('./public'));

    return app;
};