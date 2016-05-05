
  'use strict';
  var TodoModel = require('../models/todo');
  /* jshint -W098 */
  // The Package is past automatically as first parameter
  module.exports = function (ToDo, app, auth, database) {

    app.get('/api/todos', function(req, res) {

      // use mongoose to get all todos in the database
      TodoModel.find(function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
          res.send(err)

        res.json(todos); // return all todos in JSON format
      });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

      // create a todo, information comes from AJAX request from Angular
      TodoModel.create({
        text : req.body.text,
        done : false
      }, function(err, todo) {
        if (err)
          res.send(err);

        // get and return all the todos after you create another
        TodoModel.find(function(err, todos) {
          if (err)
            res.send(err)
          res.json(todos);
        });
      });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
      TodoModel.remove({
        _id : req.params.todo_id
      }, function(err, todo) {
        if (err)
          res.send(err);

        // get and return all the todos after you create another
        TodoModel.find(function(err, todos) {
          if (err)
            res.send(err)
          res.json(todos);
        });
      });
    });



  };

