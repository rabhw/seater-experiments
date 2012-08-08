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

		if (guest) {

			if (propertyToReturn) {
				return guest[propertyToReturn];
			}
			else {
				return guest;
			}

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


	$scope.editTableNumSeats = 6;
	$scope.editTableSeats = [{guestId: null}, {guestId: null}, {guestId: null}, {guestId: null}, {guestId: null}, {guestId: null}];

	$scope.$watch('editTableNumSeats', function(newValue, oldValue) {

		newValue = parseInt(newValue);

		$scope.editTableSeats.length = newValue;

		// If adding new seats, and the new seats index is empty, push an empty seat for now
		if (newValue > oldValue && !$scope.editTableSeats[newValue-1].guestId) {
			$scope.editTableSeats[newValue-1] = { guestId: null }
		}
	});


	$scope.editTable = function(tableId) {
		var table = planService.table(tableId);
		console.log(table);
		$scope.editTableFormTitle = "Edit";
		$scope.showEditTable = true;
		$scope.setupEditTable(table);
	}

	$scope.setupEditTable = function(table) {
		$scope.flushEditTable();
		$scope.editTableId = table.data.id;
		$scope.editTableNum = table.data.name;
		$scope.editTableNumSeats = table.data.seats.length;
		$scope.editTableSeats = table.data.seats;
		$scope.editTableIndex = table.index;
	}

	$scope.flushEditTable = function() {
		$scope.editTableId = null;
		$scope.editTableNum = null;
		$scope.editTableIndex = null;
	}

	$scope.saveTable = function() {

		$scope.showEditTable = false;

		if ($scope.editTableId) {
			$scope.plans.tables[$scope.editTableIndex].name = $scope.editTableNum;
			$scope.plans.tables[$scope.editTableIndex].seats = $scope.editTableSeats;
		}

		else {
			$scope.plans.tables.push({
				//@TODO: generate id?
					"id" : 543534,
					"name" : $scope.editTableNum,
					"shape" : $scope.editTableShape,
					"xPos" : $scope.editTableX,
					"yPos" : $scope.editTableY,
					"rotate" : "0deg",
					"seats" : $scope.editTableSeats
			});
		}
	}


}

function GuestCtrl($scope, $routeParams, planService) {
	$scope.guests = planService.guests();
}