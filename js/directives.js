'use strict';

/* Directives */


angular.module('seater.directives', []).directive('testDirective', function() {
	var directiveDefinitionObject = {
	    link: function postLink(scope, iElement, iAttrs) { 	 
        	iElement.tokenInput(scope.plans.guests, {
				tokenLimit: 1
				
			});

			iElement.show();

			iElement.change(function() {
				console.log('changed')
			});

			scope.$watch( 'guest.id', function() {
				console.log('watch triggered');
			});       	
		}
	  };
	  return directiveDefinitionObject;
});