'use strict';

angular.module('mean.toDo').config(['$viewPathProvider', '$stateProvider',
  function($viewPathProvider, $stateProvider) {
    $viewPathProvider.override('system/views/index.html', 'toDo/views/index.html');
  }
]);
