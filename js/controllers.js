'use strict';

/* Controllers */

function AppCtrl($scope, $routeParams) {

	$scope.plans = {
		"tables" : {
			1 : {
				"number" : 2,
				"shape" : "circle",
				"xPos" : "20%",
				"yPos" : "50%",
				"rotate" : "45deg",
				"seats" : [1,2,3,4,5]
			},
			2 : {
				"number" : 4,
				"shape" : "rect",
				"xPos" : "90%",
				"yPos" : "30%",
				"rotate" : "90deg",
				"seats" : [6,7,8,9]
			}
		},
		"guests" : {
			2 : {
				"name" : "Ross"
			},
			3 : {
				"name" : "Thomas"
			},
			4 : {
				"name" : "Ken"
			}
		}
	}
}


function PlanCtrl($scope, $routeParams) {
	
}