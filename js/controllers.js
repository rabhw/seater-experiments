'use strict';

/* Controllers */

function AppCtrl($scope, $routeParams) {

}


function PlanCtrl($scope, $routeParams, planService) {


	$scope.plans = planService.all();
	$scope.guests = planService.guests();

	$scope.setGuest = function(tableId, seatIndex) {
		$scope.editTable = tableId;
		$scope.editSeat = seatIndex;
		if (planService.guest(tableId, seatIndex).id) {
			$scope.editGuest = planService.guest(tableId, seatIndex).id;
		}
		else {
			$scope.editGuest = '';
		}
	}
}

function SeatCtrl($scope, $routeParams, planService) {

}