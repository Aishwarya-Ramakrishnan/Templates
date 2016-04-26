/**
 * Created by muthamil on 09/04/16.
 */

var seneca = require('seneca')()
seneca.use('seneca-entity')

seneca.use('mysql-store', {
    name:'senecatest',
    host:'localhost',
    user:'root',
    password:'muthamil',
    port:3306
})
module.exports = seneca.make$('toDOTable');