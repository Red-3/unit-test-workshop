(function() {

    'use strict';

    angular.module('myApp.view1', ['ngRoute', 'services'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Controller',
        controllerAs: 'vm'
      });
    }]);

}());