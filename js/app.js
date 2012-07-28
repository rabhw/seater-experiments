'use strict';


// Declare app level module which depends on filters, and services
var seater = angular.module('seater', ['ui', 'seater.services', 'seater.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/plan', {templateUrl: 'views/plan.html', controller: PlanCtrl});
    $routeProvider.when('/table/:tableId/seat/:seatId/edit', {templateUrl: 'views/edit-seat.html', controller: SeatCtrl});
    $routeProvider.otherwise({redirectTo: '/plan'});
  }]);


seater.value('ui.config', {
   select2: {
		allowClear: true,
		width: 'element'
   },
   jq: { 
      // The qtip namespace
      qtip: {
         // qTip options. This object will be used as the defaults
         position: {
            my: 'left center',
            at:'right center',
            viewport: $(window)
         },
         hide: {
         	event: false,
         	effect: false
         },
         show: {
         	event: 'click',
         	solo: true
         }
      }
   }
});