'use strict';


// Declare app level module which depends on filters, and services
var seater = angular.module('seater', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/plan', {templateUrl: 'views/plan.html', controller: PlanCtrl});
    $routeProvider.when('/table/:tableId/seat/:seatId/edit', {templateUrl: 'views/edit-seat.html', controller: EditSeatCtrl});
    $routeProvider.otherwise({redirectTo: '/plan'});
  }]);