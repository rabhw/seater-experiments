'use strict';

/* Controllers */

function AppCtrl($scope, $routeParams) {

}


function PlanCtrl($scope, $compile, $routeParams, planService) {


	$scope.plans = planService.all();
	$scope.guests = planService.guests();

	$scope.setGuest = function(tableId, seatIndex) {
		$scope.editTable = tableId;
		$scope.editSeat = seatIndex;
		$scope.editGuest = planService.guest(tableId, seatIndex).id;
	}

	$scope.saveSeat = function() {
		planService.saveSeat($scope.editTable, $scope.editSeat, $scope.editGuest);
	}
}

function SeatCtrl($scope, $routeParams, planService) {

}