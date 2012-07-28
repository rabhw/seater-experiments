'use strict';

/* Controllers */

function AppCtrl($scope, $routeParams) {

}


function PlanCtrl($scope, $compile, $routeParams, planService) {

	$scope.plans = planService.all();
	$scope.guests = planService.guests();

	$scope.setGuest = function($event, tableId, seatIndex) {
		$scope.guest = planService.guest(tableId, seatIndex).id;
	}

	$scope.getContent = function(api, tableId, seatIndex) {
			var compiled = $('.edit-seat').html();
			compiled = $compile(compiled)($scope);
			return compiled;
	}
}

function SeatCtrl($scope, $routeParams, planService) {

}