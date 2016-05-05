var express        = require('express')
var app = express()
var seneca = require('seneca')()

var port  	 = process.env.PORT;
//var port  	 = 3000;

var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/Views'))
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// routes ======================================================================
require('./server/routes.js')(app);


app.use( seneca.export('web') )

app.listen(port)
