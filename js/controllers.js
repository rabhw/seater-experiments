'use strict';

/* Controllers */

function AppCtrl($scope, $routeParams) {

}


function PlanCtrl($scope, $routeParams, planService) {
		$scope.plans = planService.all();
}

function SeatCtrl($scope, $routeParams, planService) {

	$scope.guests = planService.guests();

	$scope.guest = planService.guest().id;

	$scope.saveSeat = function(guestId) {
		console.log(guestId);
	}

}