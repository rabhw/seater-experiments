'use strict';


// Declare app level module which depends on filters, and services
var seater = angular.module('seater', ['ui', 'seater.directives', 'mongolabResource', 'SharedServices']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/plan', {templateUrl: 'views/plan.html', controller: PlanCtrl});
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


angular.module('SharedServices', [])
    .config(function ($httpProvider) {
        $httpProvider.responseInterceptors.push('myHttpInterceptor');
        var spinnerFunction = function (data, headersGetter) {
            // todo start the spinner here
            // $('#loading').show();
            return data;
        };
        $httpProvider.defaults.transformRequest.push(spinnerFunction);
    })
// register the interceptor as a service, intercepts ALL angular ajax http calls
    .factory('myHttpInterceptor', function ($q, $window) {
        return function (promise) {
            return promise.then(function (response) {
                // do something on success
                // todo hide the spinner
                // $('#loading').hide();
                return response;

            }, function (response) {
                // do something on error
                // todo hide the spinner
                // $('#loading').hide();
                return $q.reject(response);
            });
        };
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