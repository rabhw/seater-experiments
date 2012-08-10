'use strict';


// Declare app level module which depends on filters, and services
var seater = angular.module('seater', ['ui', 'seater.services', 'seater.directives', 'mongolabResource']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/plan', {templateUrl: 'views/plan.html', controller: PlanCtrl});
    $routeProvider.when('/tables/:tableId/edit', {controller: EditTableCtrl});
    $routeProvider.when('/guests', {templateUrl: 'views/guests.html', controller: GuestCtrl});
    $routeProvider.when('/debug', {templateUrl: 'views/debug.html', controller: DebugCtrl});
    $routeProvider.otherwise({redirectTo: '/plan'});
  }]);

  seater.constant('API_KEY', '5000129ce4b0e894c5bb7f05');
  seater.constant('DB_NAME', 'seater-experiments');

  seater.factory('Table', function ($mongolabResource) {
      return $mongolabResource('tables');
  });

  seater.factory('Guest', function ($mongolabResource) {
      return $mongolabResource('guests');
  });

seater.value('ui.config', {
   select2: {
		allowClear: true,
		width: 'off'
   },
   jq: { 
      // The qtip namespace
      qtip: {
         // qTip options. This object will be used as the defaults
         position: {
            my: 'left center',
            at:'right center',
            viewport: $('#canvas')
         },
         hide: {
         	event: false,
         	effect: false
         },
         show: {
         	event: 'click'
         }
      }
   }
});