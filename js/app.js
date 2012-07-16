'use strict';


// Declare app level module which depends on filters, and services
var seater = angular.module('seater', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/plan', {templateUrl: 'views/plan.html', controller: PlanCtrl});
    $routeProvider.otherwise({redirectTo: '/plan'});
  }]);