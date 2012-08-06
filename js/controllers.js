'use strict';

/* Controllers */

function AppCtrl($scope, $routeParams, $location) {
	$scope.location = $location;
}


function PlanCtrl($scope, $routeParams, planService) {

	$scope.showPalette = false;

	$scope.table = '';

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

	$scope.rotateTable = function(table, dir) {

		var currRot = parseInt(table.rotate), newRot;

		// Clockwise
		if (dir === "cw") {
			newRot = currRot+=45;
			newRot = newRot+'deg';
			table.rotate = newRot;
		}
		// Counter-Clockwise
		else {
			newRot = currRot-=45;
			newRot = newRot+'deg';
			table.rotate = newRot;
		}
	}


	$scope.editTableSeats = [];

	$scope.$watch('editTableNumSeats', function(newValue) {

		if (newValue) {
			$scope.editTableSeats.length = newValue;
			$scope.$apply();
		}

	});

	$scope.editTable = function() {

		$scope.showEditTable = false;

		$scope.plans.tables.push({
			//@TODO: generate id?
				"id" : 543534,
				"number" : $scope.editTableNum,
				"shape" : $scope.editTableShape,
				"xPos" : $scope.editTableX,
				"yPos" : $scope.editTableY,
				"rotate" : "0deg",
				"seats" : $scope.editTableSeats
		});
	}


}

function GuestCtrl($scope, $routeParams, planService) {
	$scope.guests = planService.guests();
}