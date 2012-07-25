'use strict';

/* Directives */


angular.module('seater.directives', []).directive('tokenInput', function (planService) {
        return {
            restrict: 'E',
            replace: true,
            template: '<input type="text" id="guest-name" ng-model="guest.id" />',
            link : function (scope, element, attrs) {
            	element.tokenInput(planService.guests(), {
					tokenLimit: 1
            	});

            	$('#guest-name').show(); // Provides visual that the input is being updated by tokeninput

            }
        };
});