/*
 * These tests assume a MySQL database/structure is already created.
 * execute script/schema.sql to create
 */
var express        = require('express')
var app = express()
var seneca = require('seneca')()

var port  	 = process.env.PORT;

var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/app/Views'))
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// routes ======================================================================
require('./app/routes.js')(app);


app.use( seneca.export('web') )

app.listen(port)
