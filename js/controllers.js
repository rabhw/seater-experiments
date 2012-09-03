'use strict';

/* Controllers */

function AppCtrl($scope, $routeParams, $location) {
	$scope.location = $location;
	$scope.showPalette = false;
}


function PlanCtrl($scope, $filter, Table, Guest) {

	$scope.tables = Table.query();
	$scope.guests = Guest.query();

	$scope.canvasEmpty = function() {

		if ($scope.tables.length === 0) {
			return true;
		}
	}

	$scope.editTable = function(table) {
		$scope.showEditTable = true; // show the modal
		if (table) {
			$scope.editTableFormTitle = "Edit";
			$scope.originalTable = table;
			$scope.editingTable = new Table(table); // create a copy of the table object based on the one clicked
		}

		else {
			$scope.editTableFormTitle = "Add";
			$scope.editingTable = new Table();
		}

		// 6 Seats as default for new tables
		if (!$scope.editingTable.seats) {
			$scope.editingTable.seats = [{'guestId' : undefined}, {'guestId' : undefined}, {'guestId' : undefined}, {'guestId' : undefined}, {'guestId' : undefined}, {'guestId' : undefined}];
		}

	}

	$scope.addSeat = function() {
		// Max seats = 10
		if ($scope.editingTable.seats.length < 10) {
			$scope.editingTable.seats.push({'guestId' : undefined});
		}
	}

	$scope.removeSeat = function(seatIndex) {
		// Min seats = 1
		if ($scope.editingTable.seats.length > 1) {
			$scope.editingTable.seats.splice(seatIndex, 1);
		}
	}

	$scope.clearSeat = function(guestId) {
		// Empties a single seat
		_.each($scope.tables, function(table) {
			_.each(table.seats, function(seat) {
				if (seat.guestId === guestId) {
					seat.guestId = undefined;
					table.update();
				}
			});
		});
	}

	$scope.clearAllSeats = function(tableToCheck) {
		// Checks all seats of a given table, empties as needed
		_.each($scope.tables, function(table) {
			_.each(table.seats, function(seat) {
				_.each(tableToCheck.seats, function(checkedSeat) {
					if (seat.guestId === checkedSeat.guestId) {
						seat.guestId = undefined;
						table.update();
					}
				});
			});
		});
	}

	$scope.clearEditTableSeat = function(changedIndex) {
		// Keeps guest dropdowns unique while in editing pane
		_.each($scope.editingTable.seats, function(seat, index) {
			if (seat.guestId === $scope.editingTable.seats[changedIndex].guestId && index != changedIndex) {
				seat.guestId = undefined;
			}
		});
	}

	$scope.tableIsClean = function() {
		return angular.equals($scope.originalTable, $scope.editingTable);
	}

	$scope.updateTable = function() {

		$scope.clearAllSeats($scope.editingTable);

		$scope.editingTable.saveOrUpdate(
			function save(data) {
				$scope.showEditTable = false;
				$scope.tables = $scope.tables.concat(data);
			},
			function update(data) {
			$scope.showEditTable = false;
			$scope.originalTable = angular.extend($scope.originalTable, data); // merge result back to original
		});

	}

	$scope.removeTable = function(table) {
		table.remove(function(data) {
			$scope.showEditTable = false;
			$scope.tables = _.reject($scope.tables, function(obj) {
				return obj._id.$oid === data._id.$oid;
			});
		});
	}

	$scope.setGuest = function(table, seatIndex) {
		$scope.editingSeat = {};
		$scope.editingSeat.table = table;
		$scope.editingSeat.guestId = table.seats[seatIndex].guestId;
		$scope.editingSeat.seatIndex = seatIndex;
	}

	$scope.rotateTable = function(table, dir) {
		$scope.disableTableControls = true;

		var currRot, newRot;

		if (table.rotate) {
			currRot = parseInt(table.rotate);
		}

		else {
			currRot = 0;
		}

		if (dir === "cw") {
			newRot = currRot+=45;
			newRot = newRot+'deg';
			table.rotate = newRot;
		}
		else {
			newRot = currRot-=45;
			newRot = newRot+'deg';
			table.rotate = newRot;
		}

		table.update(function() {
			$scope.disableTableControls = false;
		});
	}

	$scope.getGuest = function(table, seatIndex, propertyToReturn) {
		var guest = _.find($scope.guests, function(obj) {
			return obj._id.$oid === table.seats[seatIndex].guestId
		});

		if (guest) {
			if (guest[propertyToReturn]) {
				$scope.occupiedSeat = true;
				return guest[propertyToReturn];
			}

			else {
				return guest;
			}
		}

		else {
			$scope.occupiedSeat = false;
			return "Empty seat";
		}
	}

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
	  	$scope.table = {}; // empty
	  	$scope.tables = Table.query(); // update to show new guests without full page refresh
	  });
	}
}

function GuestCtrl($scope, Table, Guest) {


	$scope.showPalette = true;

	$scope.tables = Table.query();
	$scope.guests = Guest.query();

	$scope.saveGuest = function() {
	  Guest.save($scope.guest, function(data) {
	  	$scope.guest = {}; // empty
	  	$scope.guests = $scope.guests.concat(data);
	  });
	}

	$scope.seatedAt = function(guest) {
		var tableName;
		_.each($scope.tables, function(table) {
			_.find(table.seats, function(seat) {
				if (seat.guestId === guest._id.$oid) {
					tableName = table.name;
				}
			});
		});

		return tableName;
	}

}