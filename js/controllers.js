'use strict';

/* Controllers */

function AppCtrl($scope, $routeParams) {

	$scope.plans = {
		"tables" : [	
			{
				"id" : 23,
				"number" : 2,
				"shape" : "circle",
				"xPos" : "20%",
				"yPos" : "50%",
				"rotate" : "45deg",
				"seats" : [1,2]
			},
			{
				"id" : 48,
				"number" : 4,
				"shape" : "rect",
				"xPos" : "90%",
				"yPos" : "30%",
				"rotate" : "90deg",
				"seats" : [3,4,5,6]
			}
		],
		"guests" : [
			{
				"id" : 1,
				"name" : "Ross"
			},
			{
				"id" : 2,
				"name" : "Thomas"
			},
			{
				"id" : 3,
				"name" : "Ken"
			},
			{
				"id" : 4,
				"name" : "Susheila"
			},
			{
				"id" : 5,
				"name" : "George"
			},
			{
				"id" : 6,
				"name" : "Lavery"
			}
		]
	}
}


function PlanCtrl($scope, $routeParams) {

}

function EditSeatCtrl($scope, $routeParams) {

	$scope.addGuest = function() {
		console.log('adding guest');
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
	$('#guest-name').tokenInput($scope.plans.guests, {
		tokenLimit: 1,
		prePopulate: [$scope.guest]
	});

}