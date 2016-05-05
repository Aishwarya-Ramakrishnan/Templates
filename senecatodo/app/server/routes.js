/**
 * Created by muthamil on 09/04/16.
 */

var seneca = require('seneca')()
seneca.use('seneca-entity')
var nodeStarterConfig=require('../node_starter_kit_environment_parser.js');
var env=nodeStarterConfig.getEnv();


seneca.use('mysql-store', env)

global.dbCredentials={};



//function getEnvironmentVariables() {
//
//    if(process.env.VCAP_SERVICES) {
//        var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
//        // Pattern match to find the first instance of a Cloudant service in
//        // VCAP_SERVICES. If you know your service key, you can access the
//        // service credentials directly by using the vcapServices object.
//        for(var vcapService in vcapServices){
//            if(vcapService.match(/cleardb/i)){
//                global.dbCredentials.hostname = vcapServices[vcapService][0].credentials.hostname;
//                global.dbCredentials.jdbcUrl = vcapServices[vcapService][0].credentials.jdbcUrl;
//                global.dbCredentials.name = vcapServices[vcapService][0].credentials.name;
//                global.dbCredentials.password = vcapServices[vcapService][0].credentials.password;
//                global.dbCredentials.port = vcapServices[vcapService][0].credentials.port;
//                global.dbCredentials.url = vcapServices[vcapService][0].credentials.uri;
//                global.dbCredentials.database = vcapServices[vcapService][0].credentials.database;
//                global.dbCredentials.username = vcapServices[vcapService][0].credentials.username;
//
//                break;
//            }
//        }
//
//    } else{
//        console.warn('VCAP_SERVICES environment variable not set - data will be unavailable to the UI');
//
//    }
//}
//
//getEnvironmentVariables();

seneca.use('mysql-store', env)

//seneca.use('mysql-store', {
//    name:global.dbCredentials.name,
//    host:global.dbCredentials.hostname,
//    user:global.dbCredentials.username,
//    password:global.dbCredentials.password,
//    port:global.dbCredentials.port
//})


module.exports = function(app) {



    function createTable(callback){
        var Todo = seneca.make$('toDOTable');
        Todo.native$(function (err, connectionpool) {
            connectionpool.query('CREATE TABLE IF NOT EXISTS toDOTable (id VARCHAR(36), taskName VARCHAR(255)) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5',function(err,status){
                callback(err,status);
            });

        });
    }

    app.get('/api/todos', function(req, res) {

        createTable(function (err,status){
            if(!err)
            {
                var Todo = seneca.make$('toDOTable');
                Todo.list$({}, function (err, todos) {
                    console.log('items = ' + todos);
                    if (err)
                        res.send(err)

                    res.json(todos); // return all todos in JSON format
                });
            }

        });

    });

    app.post('/api/todos', function(req, res) {

        createTable(function (err,status){
            if(!err)
            {
                var Todo = seneca.make$('toDOTable');
                Todo.taskName  = req.body.text
                Todo.save$(function (err, todo) {
                    console.log("todo.id = " + todo.id)
                    if (err)
                        res.send(err)

                    res.send(todo.id);
                });
            }

        });


    });

    app.delete('/api/todos', function(req, res) {

        //var Todo = require('./models/todo');
        var Todo = seneca.make$('toDOTable');
        //Todo.remove$('8b322df9-d41a-418d-b75d-5b5af1541edc',function(err,success){
        //    console.log('test');
        //})
        Todo.remove$({'taskName' : req.body.text},function(err,success){
            if (err)
                res.send(err);

            res.send('Deleted SuccessFully');
        })

    });


};
