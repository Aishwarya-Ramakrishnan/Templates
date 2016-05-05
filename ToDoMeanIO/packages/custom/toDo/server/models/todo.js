
var mongoose = require("mongoose");

var  Schema = mongoose.Schema;


var toDoSchema = new Schema({
    text:String

});

module.exports = mongoose.model('ToDo',toDoSchema);
