/**
 * Created by muthamil on 08/04/16.
 */

var TaskItem = function(taskname) {
    this.taskname = ko.observable(taskname);

};

var SimpleListModel = function(items) {
    this.items = ko.observableArray(items);
    this.itemToAdd = ko.observable("");

    this.removeTask = function(task){

        $.ajax({
            //url: 'http://senecasample.cfapps.io/api/todos',
            url: '/api/todos',
            type: 'DELETE',
            data: {'text':task.taskname},//{'text':task},
            async: false,
            //data: this.itemToAdd(),
            success: function(result) {
                // Do something with the result
                //ko.applyBindings(new SimpleListModel(getData()));
                //alert( "Deleted Successfully" );
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                this.itemToAdd("");
                return;
            }
        });
        var index = this.items.indexOf(task);
        this.items.splice(index,1);
    }.bind(this);

    this.addItem = function() {

        if (this.itemToAdd() != "") {

            var mydata = {'text':this.itemToAdd()};

            $.ajax({
                //url: 'http://senecasample.cfapps.io/api/todos',
                url: '/api/todos',
                type: 'POST',
                data: mydata,//{'text':task},
                async: false,
                success: function(result) {
                    //alert(result);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    this.itemToAdd("");
                    return;
                }
            });
            //var url =  '/api/todos'
            //$.post( "/api/todos",mydata, function(data) {
            //    alert( "Added Successfully" );
            //});
            this.items.push(new TaskItem(this.itemToAdd()));
            //this.items.push(this.itemToAdd()); // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
            this.itemToAdd(""); // Clears the text box, because it's bound to the "itemToAdd" observable

        }
    }.bind(this);  // Ensure that "this" is always this view model

};



ko.applyBindings(new SimpleListModel(getData()));

function getData()
{

    $.ajax({
        //url: "http://senecasample.cfapps.io/api/todos",
        url: "/api/todos",
        dataType: 'json',
        async: false,
        type: "GET",
        success: function(data) {

            var dataArr = [];
            $.each(data, function( index, value ) {

                dataArr.push(new TaskItem(value.taskName));
            });

            ko.applyBindings(new SimpleListModel(dataArr));
        }
    });

}

