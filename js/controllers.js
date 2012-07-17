'use strict';

/* Controllers */

function AppCtrl($scope, $routeParams) {

	$scope.plans = {
		"tables" : [	
			{
				"id" : 0,
				"number" : 2,
				"shape" : "circle",
				"xPos" : "20%",
				"yPos" : "50%",
				"rotate" : "45deg",
				"seats" : [1,2]
			},
			{
				"id" : 1,
				"number" : 4,
				"shape" : "rect",
				"xPos" : "90%",
				"yPos" : "30%",
				"rotate" : "90deg",
				"seats" : [6,7,8,9]
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