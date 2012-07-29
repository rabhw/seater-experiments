'use strict';

/* Services */

angular.module('seater.services', []).service('planService', function ($routeParams) {

	var plans = {
		"tables" : [	
			{
				"id" : 23,
				"number" : 2,
				"shape" : "circle",
				"xPos" : "200px",
				"yPos" : "300px",
				"rotate" : "45deg",
				"seats" : [1,2,3,12,11,10,7,9]
			},
			{
				"id" : 48,
				"number" : 4,
				"shape" : "rect",
				"xPos" : "600px",
				"yPos" : "100px",
				"rotate" : "90deg",
				"seats" : [3,4,5,6]
			}
		],
		"guests" : [
			{
				"id" : 1,
				"text" : "Ross Lavery"
			},
			{
				"id" : 2,
				"text" : "Thomas Price"
			},
			{
				"id" : 3,
				"text" : "Ken George"
			},
			{
				"id" : 4,
				"text" : "Susheila Li"
			},
			{
				"id" : 5,
				"text" : "John Doe"
			},
			{
				"id" : 6,
				"text" : "Jane Samuelson"
			},
			{
				"id" : 7,
				"text" : "Gillian Minsky"
			},
			{
				"id" : 8,
				"text" : "John Lavery"
			},
			{
				"id" : 9,
				"text" : "Gail Lavery"
			},
			{
				"id" : 10,
				"text" : "Winnie Wong"
			},
			{
				"id" : 11,
				"text" : "Carmen Li"
			},
			{
				"id" : 12,
				"text" : "Najeeb Sachedina"
			},

		]
	}

    return {

        all : function () {
            return plans;
        },

        guests : function() {
        	return plans.guests;
        },

        table : function(tableId) {
        	var table = _.filter(plans.tables, function(obj) {
        		return obj.id == tableId;
        	});

        	return table[0];
        },

        guest : function(tableId, seatId) {
        	var table = this.table(tableId);
        	var guestId = table.seats[seatId];
        	var guest = _.filter(plans.guests, function(obj) {
        		return obj.id == guestId;
        	});

        	return guest[0];
        },

        saveSeat : function(tableId, seatId, guestId) {
        	var table = this.table(tableId);
        	console.log(tableId, seatId, guestId);
        	table.seats[seatId] = guestId;
        	console.log('saved');
        }
    };
});