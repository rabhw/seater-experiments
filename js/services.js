'use strict';

/* Services */

angular.module('seater.services', []).service('planService', function ($routeParams) {

	var plans = {
		"tables" : [	
			{
				"id" : 23,
				"name" : "Family",
				"shape" : "circle",
				"xPos" : "200px",
				"yPos" : "300px",
				"rotate" : "45deg",
				"seats" : [{"guestId": 1}, {"guestId": 2}, {"guestId": 3}, {"guestId": 4}, {"guestId": 5}]
			},
			{
				"id" : 48,
				"name" : "Friends",
				"shape" : "rect",
				"xPos" : "600px",
				"yPos" : "100px",
				"rotate" : "0deg",
				"seats" : [{"guestId": 6}, {"guestId": 7}, {"guestId": 8}, {"guestId": 9}]
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
			}
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
			
        	var index = 0,
        	tableData = _.find(plans.tables, function(obj){
        	    return obj.id == tableId || ++index == plans.tables.length && (index = null);
        	});

        	return {
        		'data' : tableData,
        		'index' : index
        	}



        },

        guest : function(tableId, seatId) {
        	var table = this.table(tableId).data;

        	if (table.seats[seatId] && table.seats[seatId].guestId) {

        		var guest = _.find(plans.guests, function(obj) {
        			return obj.id == table.seats[seatId].guestId;
        		});

        		return guest;

        	}

        	else {
        		return;
        	}
        },

        saveSeat : function(tableId, seatId, guestId) {
        	var table = this.table(tableId).data;
        	table.seats[seatId].guestId = guestId;
        }
    };
});