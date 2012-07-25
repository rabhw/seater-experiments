'use strict';

/* Controllers */

function AppCtrl($scope, $routeParams) {

}


function PlanCtrl($scope, $routeParams, planService) {
		$scope.plans = planService.all();
}

function SeatCtrl($scope, $routeParams, planService) {
	$scope.guest = planService.guest();

	$scope.saveSeat = function(guestId) {
		console.log(guestId);
	}

}