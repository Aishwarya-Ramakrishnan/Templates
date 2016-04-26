/**
 * Created by muthamil on 09/04/16.
 */

var seneca = require('seneca')()
seneca.use('seneca-entity')

global.dbCredentials={};


//seneca.use('mysql-store', {
//    name:'senecatest',
//    host:'localhost',
//    user:'root',
//    password:'muthamil',
//    port:3306
//})


function getEnvironmentVariables() {

    if(process.env.VCAP_SERVICES) {
        var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
        // Pattern match to find the first instance of a Cloudant service in
        // VCAP_SERVICES. If you know your service key, you can access the
        // service credentials directly by using the vcapServices object.
        for(var vcapService in vcapServices){
            if(vcapService.match(/cleardb/i)){
                global.dbCredentials.hostname = vcapServices[vcapService][0].credentials.hostname;
                global.dbCredentials.jdbcUrl = vcapServices[vcapService][0].credentials.jdbcUrl;
                global.dbCredentials.name = vcapServices[vcapService][0].credentials.name;
                global.dbCredentials.password = vcapServices[vcapService][0].credentials.password;
                global.dbCredentials.port = vcapServices[vcapService][0].credentials.port;
                global.dbCredentials.url = vcapServices[vcapService][0].credentials.uri;
                global.dbCredentials.database = vcapServices[vcapService][0].credentials.database;
                global.dbCredentials.username = vcapServices[vcapService][0].credentials.username;

                break;
            }
        }
        //if(db==null){
        //    console.warn('Could not find Cloudant credentials in VCAP_SERVICES environment variable - data will be unavailable to the UI');
        //}
    } else{
        console.warn('VCAP_SERVICES environment variable not set - data will be unavailable to the UI');

    }
}

getEnvironmentVariables();
//
//seneca.use('mysql-store', {
//    name:'ad_0b5c5a6418fc921',
//    host:'us-cdbr-iron-east-03.cleardb.net',
//    user:"b2906dd07b73fe",
//    password:'068edbcb',
//    port:3306
//})


seneca.use('mysql-store', {
    name:global.dbCredentials.name,
    host:global.dbCredentials.hostname,
    user:global.dbCredentials.username,
    password:global.dbCredentials.password,
    port:global.dbCredentials.port
})

//module.exports = seneca.make$('toDOTable');

module.exports = function(app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {

        //var Todo = require('./models/todo');
        var Todo = seneca.make$('toDOTable');
        Todo.native$(function (err, connectionpool) {
            connectionpool.query('CREATE TABLE toDOTable (id VARCHAR(36), taskName VARCHAR(255)) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5',function(err,status){
                Todo.list$({}, function (err, todos) {
                    console.log('items = ' + todos);
                    if (err)
                        res.send(err)

                    res.json(todos); // return all todos in JSON format
                })
            })
        });

    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {


        var todo = seneca.make$('toDOTable');
        todo.native$(function (err, connectionpool) {
            //todo.query()
            connectionpool.query('CREATE TABLE toDOTable (id VARCHAR(36), taskName VARCHAR(255)) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5',function(err,status){
                var Todo = seneca.make$('toDOTable');
                Todo.taskName  = req.body.text
                Todo.save$(function (err, todo) {
                    console.log("todo.id = " + todo.id)
                    if (err)
                        res.send(err)

                    res.send(todo.id);
                });
            });
        });
        //var Todo = require('./models/todo');

    });

    // create todo and send back all todos after creation
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

    //// delete a todo
    //app.delete('/api/todos/:todo_id', function(req, res) {
    //    Todo.remove({
    //        _id : req.params.todo_id
    //    }, function(err, todo) {
    //        if (err)
    //            res.send(err);
    //
    //        // get and return all the todos after you create another
    //        Todo.find(function(err, todos) {
    //            if (err)
    //                res.send(err)
    //            res.json(todos);
    //        });
    //    });
    //});

    // application -------------------------------------------------------------
    //app.get('*', function(req, res) {
    //    res.sendFile('./Views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    //});
};
