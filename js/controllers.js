'use strict';

/* Controllers */

function AppCtrl($scope, $routeParams) {

}


function PlanCtrl($scope, $routeParams, planService) {
		$scope.plans = planService.all();
}

function SeatCtrl($scope, $routeParams, planService) {

	// Get all plans
	$scope.plans = planService.all();

	$scope.addGuest = function(guestId) {
		console.log(guestId);
	}

	// Get the current table based on route tableId
	var table = _.filter($scope.plans.tables, function(obj) {
		return obj.id == $routeParams.tableId;
	});

	$scope.table = table[0];


	// Do a loopup in the seats object for id that matches route seatId
	var guestId = $scope.table.seats[$routeParams.seatId];

	// Get the current guest based on route
	var guest = _.filter($scope.plans.guests, function(obj) {
		return obj.id == guestId;
	});

	$scope.guest = guest[0];


	// TODO: Convert guest name field into token input
	/*$('#guest-name').tokenInput($scope.plans.guests, {
		tokenLimit: 1,
		prePopulate: [$scope.guest]
	});*/

}