'use strict';

/* Controllers */

function AppCtrl($scope, $routeParams) {

}


function PlanCtrl($scope, $routeParams, planService) {


	$scope.plans = planService.all();
	$scope.guests = planService.guests();

	$scope.getGuest = function(tableId, seatIndex, propertyToReturn) {

		var guest = planService.guest(tableId, seatIndex);

		if (propertyToReturn) {
			return guest[propertyToReturn];
		}
		else {
			return guest;
		}
		
	}

	$scope.setGuest = function(tableId, seatIndex) {
		$scope.editTable = tableId;
		$scope.editSeat = seatIndex;

		// @TODO: If seat is empty, will fail to read id property
		$scope.editGuest = planService.guest(tableId, seatIndex).id;
	}
}

function SeatCtrl($scope, $routeParams, planService) {

}