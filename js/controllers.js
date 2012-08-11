'use strict';

/* Controllers */

function AppCtrl($scope, $routeParams, $location) {
	$scope.location = $location;
}


function PlanCtrl($scope, $filter, Table, Guest) {

	$scope.showPalette = false;

	$scope.tables = Table.query();
	$scope.guests = Guest.query();

	$scope.editTable = function(table) {
		$scope.showEditTable = true; // show the modal
		$scope.originalTable = table;
		$scope.editingTable = new Table(table); // create a copy of the table object based on the one clicked

		if (!$scope.editingTable.seats) {
			$scope.seatsLimit = 6;
			$scope.editingTable.seats = [{'guestId' : undefined}, {'guestId' : undefined}, {'guestId' : undefined}, {'guestId' : undefined}, {'guestId' : undefined}, {'guestId' : undefined}];
		}

		else {
			$scope.seatsLimit = $scope.editingTable.seats.length;
		}

		$scope.$watch('seatsLimit', function(newValue, oldValue) {
			if (newValue > oldValue) {
				$scope.editingTable.seats.push({'guestId' : undefined});
			}
			else {
				$scope.editingTable.seats.length = newValue;
			}
		});

	}

	$scope.updateTable = function() {
		$scope.editingTable.saveOrUpdate(
			function save() {
				$scope.showEditTable = false;
			},
			function update(data) {
			$scope.showEditTable = false; // hide the modal
			$scope.originalTable = angular.extend($scope.originalTable, data); // merge result back to original
			console.log(data);
		});

	}

	$scope.getGuest = function(table, seatIndex, propertyToReturn) {
		var guest = _.find($scope.guests, function(obj) {
			return obj._id.$oid == table.seats[seatIndex].guestId
		});

		if (guest) {
			if (guest[propertyToReturn]) {
				return guest[propertyToReturn];
			}

			else {
				return guest;
			}
		}

		else {
			return "Empty seat";
		}
	}

	$scope.setGuest = function(table, seatIndex) {

		$scope.editingSeat = table.seats[seatIndex].guestId;

	}

	$scope.saveSeat = function() {
		
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

}

function EditTableCtrl($scope, $routeParams, $location, Table, Guest) {
	
}

function DebugCtrl($scope, $location, Guest, Table) {
	$scope.guests = Guest.query();
	$scope.tables = Table.query();

	$scope.saveGuest = function() {
	  Guest.save($scope.guest, function() {
	  	$scope.guest = {}; // empty
	  	$scope.guests = Guest.query(); // update to show new guests without full page refresh
	  });
	}

	$scope.saveTable = function() {
	  Table.save($scope.table, function() {
	  	console.log('saved table');
	  	$scope.table = {}; // empty
	  	$scope.tables = Table.query(); // update to show new guests without full page refresh
	  });
	}
}

function GuestCtrl($scope) {

}