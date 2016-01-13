'use strict';

angular.module('myApp.view1', ['ngRoute', 'services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'TodosService', function($scope, TodosService) {
      TodosService.getTodoItems().then(function(todos) {
          $scope.todos = todos;
      });
}]);