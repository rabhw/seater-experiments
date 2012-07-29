'use strict';

/* Services */

angular.module('seater.services', []).service('planService', function ($routeParams) {

	var plans = {
		"tables" : [	
			{
				"id" : 23,
				"number" : 2,
				"shape" : "circle",
				"xPos" : "20%",
				"yPos" : "50%",
				"rotate" : "45deg",
				"seats" : [1,2,3]
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
				"text" : "Ross"
			},
			{
				"id" : 2,
				"text" : "Thomas"
			},
			{
				"id" : 3,
				"text" : "Ken"
			},
			{
				"id" : 4,
				"text" : "Susheila"
			},
			{
				"id" : 5,
				"text" : "George"
			},
			{
				"id" : 6,
				"text" : "Lavery"
			},
			{
				"id" : 7,
				"text" : "Ross"
			},
			{
				"id" : 8,
				"text" : "Thomas"
			},
			{
				"id" : 9,
				"text" : "Ken"
			},
			{
				"id" : 10,
				"text" : "Susheila"
			},
			{
				"id" : 11,
				"text" : "George"
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